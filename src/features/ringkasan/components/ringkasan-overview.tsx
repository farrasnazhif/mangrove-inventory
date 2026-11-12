"use client";

import { useState } from "react";
import { Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { PLOTS, STUDY } from "../constants/ringkasan-data";
import { PlotDetail } from "./plot-detail";
import { PlotList } from "./plot-list";
import { SpatialMap } from "./spatial-map";
import { SummaryMetrics } from "./summary-metrics";

export function RingkasanOverview() {
  const [selectedId, setSelectedId] = useState(PLOTS[0].id);
  const selected = PLOTS.find((plot) => plot.id === selectedId) ?? PLOTS[0];
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h5" weight="semibold">{STUDY.title}</Typography>
          <Typography as="p" variant="bs" className="mt-1 flex items-center gap-1.5 text-ink-2">
            <MapPin size={14} aria-hidden />
            {STUDY.location}
          </Typography>
        </div>
        {/* inert for now: report export is brief FR-14, contract pending Q-09 */}
        <Button variant="secondary">
          <Download size={14} />
          Unduh Rekap
        </Button>
      </header>
      <SummaryMetrics />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
        <PlotDetail plot={selected} />
        <PlotList plots={PLOTS} selectedId={selected.id} onSelect={setSelectedId} />
      </div>
      <SpatialMap />
    </div>
  );
}
