"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import type {} from "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import { MAP_ZOOM, TILE_ATTRIBUTION, TILE_URL, ZONE_COLORS, ZONE_COLOR_FALLBACK } from "../constants/map-config";
import { SPECIES_POINTS } from "../constants/species-points";
import { ZONES } from "../constants/zones";
import { speciesPopupHtml } from "./tree-popup";

const zoneColor = (name: string) => ZONE_COLORS[name] ?? ZONE_COLOR_FALLBACK;

export function PlotMap({ selectedZones = [], onSelectZone }: { selectedZones?: string[]; onSelectZone?: (zone: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const polygons = useRef(new Map<string, L.Polygon>());
  // refs keep the map from being rebuilt when the parent re-renders
  const selected = useRef(selectedZones);
  const onSelect = useRef(onSelectZone);
  const highlight = () => {
    for (const [name, polygon] of polygons.current) {
      polygon.getElement()?.classList.toggle("plot-zone-active", selected.current.includes(name));
    }
  };

  useEffect(() => {
    selected.current = selectedZones;
    onSelect.current = onSelectZone;
    highlight();
  });

  useEffect(() => {
    const zonePolygons = polygons.current;
    let cancelled = false;
    let map: LeafletMap | undefined;
    (async () => {
      const leaflet = await import("leaflet");
      const L = ("default" in leaflet ? leaflet.default : leaflet) as typeof leaflet;
      // the cluster plugin extends the global L, so expose it before loading the plugin
      Object.assign(window, { L });
      await import("leaflet.markercluster");
      if (cancelled || !container.current) return;

      // the default zoom control is replaced so the fullscreen button can sit above it in the same corner
      map = L.map(container.current, { minZoom: MAP_ZOOM.min, maxZoom: MAP_ZOOM.max, zoomControl: false });
      // "fullscreen" = the whole map frame (map, zoom buttons, zone card, back link) covers the window via CSS,
      // and the browser's real fullscreen is requested on the page as well; if the browser refuses, the CSS mode still works
      const frame = container.current.parentElement ?? container.current;
      const control = new L.Control({ position: "topleft" });
      control.onAdd = (leafletMap) => {
        const bar = L.DomUtil.create("div", "leaflet-bar");
        const button = L.DomUtil.create("a", "", bar);
        button.href = "#";
        button.setAttribute("role", "button");
        button.style.cssText = "display:flex;align-items:center;justify-content:center";
        let active = false;
        const paint = () => {
          button.title = button.ariaLabel = active ? "Keluar dari layar penuh" : "Layar penuh";
          // lucide maximize / minimize icons
          button.innerHTML = `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${
            active
              ? "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"
              : "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
          }"/></svg>`;
        };
        const set = (next: boolean) => {
          active = next;
          if (next) frame.setAttribute("data-map-fullscreen", "");
          else frame.removeAttribute("data-map-fullscreen");
          paint();
          // the frame changed size, so Leaflet has to re-measure after layout
          requestAnimationFrame(() => leafletMap.invalidateSize());
        };
        const leave = () => {
          set(false);
          if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
        };
        const onFullscreenChange = () => {
          // the user left real fullscreen with Esc or the browser UI
          if (active && !document.fullscreenElement) set(false);
        };
        const onKey = (event: KeyboardEvent) => {
          if (event.key === "Escape" && active) leave();
        };
        paint();
        L.DomEvent.on(button, "click", (event) => {
          L.DomEvent.preventDefault(event);
          if (active) {
            leave();
          } else {
            set(true);
            document.documentElement.requestFullscreen?.().catch(() => {});
          }
        });
        L.DomEvent.disableClickPropagation(bar);
        document.addEventListener("fullscreenchange", onFullscreenChange);
        document.addEventListener("keydown", onKey);
        leafletMap.once("unload", () => {
          document.removeEventListener("fullscreenchange", onFullscreenChange);
          document.removeEventListener("keydown", onKey);
          if (active) leave();
        });
        return bar;
      };
      control.addTo(map);
      L.control.zoom({ position: "topleft" }).addTo(map);
      // drops only the "Leaflet" link; keep the Esri credit, imagery terms require it (Q-06)
      map.attributionControl.setPrefix(false).setPosition("bottomleft");
      L.tileLayer(TILE_URL, {
        attribution: TILE_ATTRIBUTION,
        maxZoom: MAP_ZOOM.max,
        maxNativeZoom: MAP_ZOOM.nativeMax,
      }).addTo(map);

      for (const zone of ZONES) {
        const color = zoneColor(zone.name);
        const polygon = L.polygon(zone.corners, {
          className: "plot-zone",
          color,
          weight: 1.5,
          opacity: 0.9,
          fillColor: color,
          fillOpacity: 0.22,
        }).addTo(map);
        polygon.bindTooltip(zone.name, { permanent: true, direction: "center", className: "zone-label" });
        polygon.on("click", () => onSelect.current?.(zone.name));
        zonePolygons.set(zone.name, polygon);
      }

      const cluster = L.markerClusterGroup({
        maxClusterRadius: 60,
        disableClusteringAtZoom: MAP_ZOOM.clusterOffAt,
        iconCreateFunction: (group) => {
          const count = group.getChildCount();
          const size = 36 + Math.min(count, 20) * 1.2;
          return L.divIcon({
            html: `<div class="plot-cluster" style="width:${size}px;height:${size}px">${count}</div>`,
            className: "plot-cluster-wrap",
            iconSize: [size, size],
          });
        },
      });
      for (const point of SPECIES_POINTS) {
        const marker = L.circleMarker(point.position, {
          radius: 6,
          className: "plot-marker",
          color: "oklch(0.25 0.03 150)",
          weight: 1.5,
          fillColor: zoneColor(point.zone),
          fillOpacity: 0.95,
        });
        marker.bindPopup(speciesPopupHtml(point), { className: "tree-popup", minWidth: 240, maxWidth: 240, closeButton: false });
        marker.on("click", () => onSelect.current?.(point.zone));
        cluster.addLayer(marker);
      }
      map.addLayer(cluster);
      map.fitBounds(L.latLngBounds(ZONES.flatMap((zone) => zone.corners)), { padding: [32, 32] });
      highlight();
    })();
    return () => {
      cancelled = true;
      zonePolygons.clear();
      map?.remove();
    };
  }, []);

  return (
    <div
      ref={container}
      role="application"
      aria-label="Peta satelit zona Vak dan titik spesies"
      className="isolate h-full w-full bg-inset"
    />
  );
}
