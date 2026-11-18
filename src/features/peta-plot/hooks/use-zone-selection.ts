"use client";

import { useState } from "react";
import { plotForZone } from "@/features/inventory/api/inventory";
import { usePlotSelection } from "@/features/inventory/components/plot-provider";

/** map zone click -> shared plot selection; missingZone is a clicked zone that no workbook location names, e.g. Vak VIII */
export function useZoneSelection() {
  const { stats, select } = usePlotSelection();
  const [missingZone, setMissingZone] = useState<string | null>(null);

  function onSelectZone(zone: string) {
    const plot = plotForZone(zone);
    setMissingZone(plot ? null : zone);
    if (plot) select(plot.key);
  }

  return { stats, missingZone, onSelectZone, selectedZones: missingZone ? [missingZone] : stats.plot.zones };
}
