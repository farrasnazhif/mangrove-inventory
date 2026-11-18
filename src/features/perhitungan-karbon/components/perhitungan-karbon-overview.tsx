import { CARBON_RESULTS, CARBON_TOTALS, CARBON_TREES, FORMULAS } from "../constants/perhitungan-karbon-data";
import type { CarbonTotalRow, CarbonTreeRow } from "../types/perhitungan-karbon";
import { CarbonHeader } from "./carbon-header";
import { CarbonResults } from "./carbon-results";
import { CarbonTableSection } from "./carbon-table-section";
import { FormulaPanel } from "./formula-panel";

export function PerhitunganKarbonOverview() {
  return (
    <div className="flex flex-col gap-6">
      <CarbonHeader />
      <FormulaPanel formulas={FORMULAS} />
      <CarbonResults results={CARBON_RESULTS} />
      <CarbonTableSection<CarbonTreeRow>
        title="Rincian Per Pohon"
        caption="Rincian karbon per pohon"
        rows={CARBON_TREES}
        columns={[
          { id: "species", label: "Jenis mangrove", get: (row) => row.species },
          { id: "density", label: "ρ kayu", get: (row) => row.density },
          { id: "dbh", label: "DBH (cm)", get: (row) => row.dbh },
          { id: "agb", label: "AGB (kg)", get: (row) => row.agb },
          { id: "agc", label: "AGC (kg C)", get: (row) => row.agc },
          { id: "bgb", label: "BGB (kg)", get: (row) => row.bgb },
          { id: "bgc", label: "BGC (kg C)", get: (row) => row.bgc },
        ]}
      />
      <CarbonTableSection<CarbonTotalRow>
        title="Stok Karbon Total"
        caption="Stok karbon total per plot"
        rows={CARBON_TOTALS}
        columns={[
          { id: "plot", label: "Plot", get: (row) => row.plot },
          { id: "agc", label: "AGC (kg C)", get: (row) => row.agc },
          { id: "bgc", label: "BGC (kg C)", get: (row) => row.bgc },
          { id: "soc", label: "SOC (kg C)", get: (row) => row.soc },
          { id: "total", label: "Total (ton C / ha)", get: (row) => row.total },
          { id: "co2e", label: "CO2E(ton / ha)", get: (row) => row.co2e },
        ]}
      />
    </div>
  );
}
