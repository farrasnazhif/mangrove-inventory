import { CarbonTableSection } from "@/features/perhitungan-karbon/components/carbon-table-section";
import { FormulaPanel } from "@/features/perhitungan-karbon/components/formula-panel";
import { Select } from "@/components/ui/select";
import { Typography } from "@/components/ui/typography";
import { PLOT_OPTIONS, SOIL_FORMULAS, SOIL_LAYERS } from "../constants/bulk-density-soc-data";
import type { SoilLayerRow } from "../types/bulk-density-soc";

export function BulkDensitySocOverview() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <Typography as="h1" variant="h5" weight="semibold">Bulk Density &amp; SOC</Typography>
        <div>
          <Select options={PLOT_OPTIONS} defaultValue="PAM-04" triggerProps={{ "aria-label": "Pilih plot" }} />
        </div>
      </header>
      <FormulaPanel formulas={SOIL_FORMULAS} />
      <CarbonTableSection<SoilLayerRow>
        title="Data Inti Sedimen"
        caption="Data inti sedimen dan SOC"
        rows={SOIL_LAYERS}
        footer={{ label: "Total SOC Profil", value: "—" }}
        columns={[
          { id: "depth", label: "Kedalaman", get: (row) => row.depth },
          { id: "thickness", label: "Tebal (cm)", get: (row) => row.thickness },
          { id: "dry", label: "Massa Kering (g)", get: (row) => row.dryMass },
          { id: "volume", label: "Volume (cm2)", get: (row) => row.volume },
          { id: "loi", label: "%LOI", get: (row) => row.loi },
          { id: "pb", label: "PB (G/cm2)", get: (row) => row.bulkDensity },
          { id: "c", label: "%C", get: (row) => row.carbonPercent },
          { id: "soc", label: "SOC (mg/ma)", get: (row) => row.soc },
        ]}
      />
    </div>
  );
}
