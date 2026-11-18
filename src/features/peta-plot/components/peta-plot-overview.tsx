"use client";

import { useZoneSelection } from "../hooks/use-zone-selection";
import { PlotMap } from "./plot-map";
import { PlotSummaryCard } from "./plot-summary-card";

export function PetaPlotOverview() {
  const { stats, missingZone, onSelectZone, selectedZones } = useZoneSelection();
  // fills the area under the top bar; the shell drops its page padding on this route
  return (
    <div className="relative h-[calc(100dvh-3.5rem)] w-full">
      <PlotMap selectedZones={selectedZones} onSelectZone={onSelectZone} />
      <PlotSummaryCard stats={stats} missingZone={missingZone} />
    </div>
  );
}
