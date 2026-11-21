"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { downloadCsv } from "@/features/inventory/api/export";
import { usePlotSelection } from "@/features/inventory/components/plot-provider";
import { STUDY } from "../constants/study";
import { PlotDetail } from "./plot-detail";
import { PlotList } from "./plot-list";
import { SpatialMap } from "./spatial-map";
import { SummaryMetrics } from "./summary-metrics";

export function RingkasanOverview() {
  const { stats, all } = usePlotSelection();

  const download = () =>
    downloadCsv(
      "rekap-vak.csv",
      [
        "Vak",
        "Pohon",
        "Jenis",
        "Luas (ha)",
        "AGC (ton C)",
        "BGC (ton C)",
        "Total biomassa (ton C)",
        "CO2e (ton)",
        "SOC (Mg C/ha)",
        "Total ekosistem (ton C/ha)",
      ],
      all.map((item) => [
        item.plot.label,
        item.treeCount,
        item.speciesCount,
        item.area,
        item.agc,
        item.bgc,
        item.carbon,
        item.co2e,
        item.soc,
        item.ecosystemPerHa,
      ]),
    );
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h5" weight="semibold">
            {STUDY.title}
          </Typography>
          {/* <Typography as="p" variant="bs" className="mt-1 flex items-center gap-1.5 text-ink-2">
            <MapPin size={14} aria-hidden />
            {STUDY.location}
          </Typography> */}
        </div>
        {/* shortcut: plain CSV of the plot table, report layout and formats wait for Q-09 */}
        <Button variant="secondary" onClick={download}>
          <Download size={14} />
          Unduh Rekap
        </Button>
      </header>
      <SummaryMetrics />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
        <PlotDetail stats={stats} />
        <PlotList />
      </div>
      <SpatialMap />
    </div>
  );
}
