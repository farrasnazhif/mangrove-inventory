"use client";

import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { UNAVAILABLE, formatCoordinates, formatNumber } from "@/features/inventory/api/format";
import { plotCenter } from "@/features/inventory/api/inventory";
import { usePlotSelection } from "@/features/inventory/components/plot-provider";
import type { PlotStats } from "@/features/inventory/types/inventory";
import { CarbonDistribution } from "./carbon-distribution";
import { PlotPhotos } from "./plot-photos";

// ordinal position in the workbook, since location names are not short codes
export function PlotNumber({ index, active = false }: { index: number; active?: boolean }) {
  return (
    <span
      className={`flex size-10 shrink-0 items-center justify-center rounded-control text-[14px] font-semibold ${active ? "bg-ink text-surface" : "bg-field text-ink-2"}`}
    >
      {index + 1}
    </span>
  );
}

export function PlotDetail({ stats }: { stats: PlotStats }) {
  const { all } = usePlotSelection();
  const center = plotCenter(stats.plot);
  return (
    <Card className="flex flex-col gap-6" aria-live="polite">
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <PlotNumber index={all.indexOf(stats)} active />
          <div className="min-w-0">
            <Typography as="h2" variant="t" weight="semibold">{stats.plot.label}</Typography>
            <Typography as="p" variant="bs" className="truncate text-ink-2">
              {stats.plot.zones.length ? `Zona peta ${stats.plot.zones.join(" & ")}` : `Zona peta: ${UNAVAILABLE.toLowerCase()}`}
              {" • "}
              {center ? formatCoordinates(center) : `Koordinat: ${UNAVAILABLE.toLowerCase()}`}
            </Typography>
          </div>
        </div>
        <Typography as="p" variant="h5" weight="semibold" className="shrink-0">
          {stats.treeCount ? formatNumber(stats.carbon, 1) : "-"}{" "}
          <Typography as="span" variant="bs" weight="medium" className="text-ink-3">ton C</Typography>
        </Typography>
      </div>
      <CarbonDistribution stats={stats} />
      <PlotPhotos />
    </Card>
  );
}
