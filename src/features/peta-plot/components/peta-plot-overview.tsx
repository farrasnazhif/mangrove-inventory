"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useZoneSelection } from "../hooks/use-zone-selection";
import { PlotMap } from "./plot-map";
import { PlotSummaryCard } from "./plot-summary-card";

export function PetaPlotOverview({ fullScreen = false }: { fullScreen?: boolean }) {
  const { stats, missingZone, onSelectZone, selectedZones } = useZoneSelection();
  // inside the dashboard the map fills the area under the top bar (the shell drops its page padding on this route);
  // for visitors it fills the whole window and only a back link floats over it
  const body = (
    <div className={`relative w-full ${fullScreen ? "h-dvh" : "h-[calc(100dvh-3.5rem)]"}`}>
      <PlotMap selectedZones={selectedZones} onSelectZone={onSelectZone} />
      {fullScreen && (
        <Button
          variant="secondary"
          nativeButton={false}
          role="link"
          render={<Link href="/" />}
          className="absolute left-1/2 top-3 z-10 -translate-x-1/2"
        >
          <ArrowLeft size={14} aria-hidden />
          Beranda
        </Button>
      )}
      <PlotSummaryCard stats={stats} missingZone={missingZone} />
    </div>
  );
  return fullScreen ? <main id="main-content">{body}</main> : body;
}
