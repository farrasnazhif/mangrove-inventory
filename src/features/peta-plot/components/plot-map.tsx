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

export function PlotMap() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let map: LeafletMap | undefined;
    (async () => {
      const leaflet = await import("leaflet");
      const L = ("default" in leaflet ? leaflet.default : leaflet) as typeof leaflet;
      // the cluster plugin extends the global L, so expose it before loading the plugin
      Object.assign(window, { L });
      await import("leaflet.markercluster");
      if (cancelled || !container.current) return;

      map = L.map(container.current, { minZoom: MAP_ZOOM.min, maxZoom: MAP_ZOOM.max });
      // drops only the "Leaflet" link; keep the Esri credit, imagery terms require it (Q-06)
      map.attributionControl.setPrefix(false).setPosition("bottomleft");
      L.tileLayer(TILE_URL, {
        attribution: TILE_ATTRIBUTION,
        maxZoom: MAP_ZOOM.max,
        maxNativeZoom: MAP_ZOOM.nativeMax,
      }).addTo(map);

      const polygons = new Map<string, L.Polygon>();
      const select = (zoneName: string) => {
        for (const [id, polygon] of polygons) {
          polygon.getElement()?.classList.toggle("plot-zone-active", id === zoneName);
        }
      };
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
        polygon.on("click", () => select(zone.name));
        polygons.set(zone.name, polygon);
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
        marker.on("click", () => select(point.zone));
        cluster.addLayer(marker);
      }
      map.addLayer(cluster);
      map.fitBounds(L.latLngBounds(ZONES.flatMap((zone) => zone.corners)), { padding: [32, 32] });
    })();
    return () => {
      cancelled = true;
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
