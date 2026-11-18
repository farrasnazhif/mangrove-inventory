"use client";

import { Typography } from "@/components/ui/typography";
import { UNAVAILABLE, formatNumber } from "@/features/inventory/api/format";
import { soilCore } from "@/features/inventory/api/inventory";
import { usePlotSelection } from "@/features/inventory/components/plot-provider";
import { PlotSelect } from "@/features/inventory/components/plot-select";
import type { SedimentCore } from "@/features/inventory/types/inventory";
import { CarbonTableSection } from "@/features/perhitungan-karbon/components/carbon-table-section";
import { FormulaDialog } from "@/features/perhitungan-karbon/components/formula-dialog";
import { SOIL_FORMULAS } from "../constants/soil-formulas";

export function BulkDensitySocOverview() {
  const { stats } = usePlotSelection();
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h5" weight="semibold">Bulk Density &amp; SOC</Typography>
          <Typography as="p" variant="bs" className="mt-1 text-ink-2">Plot {stats.plot.label}</Typography>
        </div>
        <div className="flex items-center gap-2">
          <FormulaDialog formulas={SOIL_FORMULAS} />
          <PlotSelect />
        </div>
      </header>
      {/* layers are entered on the Data Lapangan page; this table only derives PB, %C and SOC */}
      <CarbonTableSection<SedimentCore>
        key={stats.plot.key}
        title="Data Inti Sedimen"
        caption="Data inti sedimen dan SOC"
        filename={`bulk-density-soc-${stats.plot.label}.csv`}
        rows={stats.plot.cores}
        empty="Data inti sedimen tidak tersedia. Tambahkan lapisan di halaman Data Lapangan."
        footer={{ label: "Total SOC Profil", value: stats.soc === null ? UNAVAILABLE : `${formatNumber(stats.soc, 2)} Mg C/ha` }}
        columns={[
          { id: "depth", label: "Kedalaman (cm)", get: (row) => formatNumber(row.depth) },
          { id: "thickness", label: "Tebal (cm)", get: (row) => formatNumber(row.thickness) },
          { id: "dry", label: "Massa Kering (g)", get: (row) => formatNumber(row.dryMass, 2) },
          { id: "volume", label: "Volume (cm3)", get: (row) => formatNumber(row.volume, 2) },
          { id: "loi", label: "%LOI", get: (row) => formatNumber(row.loi) },
          { id: "pb", label: "PB (g/cm3)", get: (row) => formatNumber(soilCore(row).bulkDensity, 3) },
          { id: "c", label: "%C", get: (row) => formatNumber(soilCore(row).carbonPercent, 2) },
          { id: "soc", label: "SOC (Mg C/ha)", get: (row) => formatNumber(soilCore(row).soc, 2) },
        ]}
      />
    </div>
  );
}
