"use client";

import { treeCarbon } from "@/features/inventory/api/inventory";
import { UNAVAILABLE, formatNumber } from "@/features/inventory/api/format";
import { FORMULAS } from "@/features/inventory/constants/method";
import { usePlotSelection } from "@/features/inventory/components/plot-provider";
import type { PlotStats, Tree } from "@/features/inventory/types/inventory";
import type { CarbonResult } from "../types/perhitungan-karbon";
import { CarbonHeader } from "./carbon-header";
import { CarbonResults } from "./carbon-results";
import { CarbonTableSection } from "./carbon-table-section";
import { FormulaPanel } from "./formula-panel";

const results = (stats: PlotStats): CarbonResult[] => [
  { id: "agc", label: "Stok Karbon Tegakan (AGC)", value: formatNumber(stats.agc, 2), unit: "ton C" },
  { id: "bgc", label: "Stok Karbon Akar (BGC)", value: formatNumber(stats.bgc, 2), unit: "ton C" },
  {
    id: "biomass",
    label: "Total Biomassa Karbon",
    value: formatNumber(stats.carbon, 2),
    unit: stats.carbonPerHa === null ? "ton C (AGC + BGC)" : `ton C (AGC + BGC) · ${formatNumber(stats.carbonPerHa, 2)} ton C/ha`,
    total: true,
  },
  {
    id: "ecosystem",
    label: "Total Stok Karbon Ekosistem",
    value: stats.ecosystemPerHa === null ? UNAVAILABLE : formatNumber(stats.ecosystemPerHa, 2),
    unit: "ton C/ha (AGC + BGC + SOC)",
    total: true,
  },
];

export function PerhitunganKarbonOverview() {
  const { stats, all } = usePlotSelection();
  return (
    <div className="flex flex-col gap-6">
      <CarbonHeader />
      <FormulaPanel formulas={FORMULAS} />
      <CarbonResults results={results(stats)} areaMissing={stats.area === null} />
      {/* key resets the page number when another plot is chosen */}
      <CarbonTableSection<Tree>
        key={stats.plot.key}
        title="Rincian Per Pohon"
        caption={`Rincian karbon per pohon ${stats.plot.label}`}
        filename={`karbon-pohon-${stats.plot.label}.csv`}
        rows={stats.plot.trees}
        empty="Data pohon tidak tersedia untuk plot ini."
        columns={[
          { id: "species", label: "Jenis mangrove", get: (row) => row.species },
          { id: "rho", label: "ρ kayu", get: (row) => formatNumber(row.rho, 3) },
          { id: "dbh", label: "DBH (cm)", get: (row) => formatNumber(row.dbh) },
          { id: "agb", label: "AGB (kg)", get: (row) => formatNumber(treeCarbon(row).agb) },
          { id: "agc", label: "AGC (kg C)", get: (row) => formatNumber(treeCarbon(row).agc) },
          { id: "bgb", label: "BGB (kg)", get: (row) => formatNumber(treeCarbon(row).bgb) },
          { id: "bgc", label: "BGC (kg C)", get: (row) => formatNumber(treeCarbon(row).bgc) },
        ]}
      />
      <CarbonTableSection<PlotStats & { id: string }>
        title="Stok Karbon Total"
        caption="Stok karbon total per plot"
        filename="stok-karbon-total.csv"
        rows={all.map((item) => ({ ...item, id: item.plot.key }))}
        columns={[
          { id: "plot", label: "Plot", get: (row) => row.plot.label },
          { id: "trees", label: "Pohon", get: (row) => String(row.treeCount) },
          { id: "agc", label: "AGC (ton C)", get: (row) => formatNumber(row.agc, 2) },
          { id: "bgc", label: "BGC (ton C)", get: (row) => formatNumber(row.bgc, 2) },
          { id: "soc", label: "SOC (Mg C/ha)", get: (row) => (row.soc === null ? null : formatNumber(row.soc, 2)) },
          { id: "total", label: "Total biomassa (ton C)", get: (row) => formatNumber(row.carbon, 2) },
          { id: "eco", label: "Total ekosistem (ton C/ha)", get: (row) => (row.ecosystemPerHa === null ? null : formatNumber(row.ecosystemPerHa, 2)) },
          { id: "co2e", label: "CO2e (ton)", get: (row) => formatNumber(row.co2e, 2) },
        ]}
      />
    </div>
  );
}
