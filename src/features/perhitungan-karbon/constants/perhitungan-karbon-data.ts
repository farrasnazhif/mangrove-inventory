import type { CarbonFormula, CarbonResult, CarbonTotalRow, CarbonTreeRow } from "../types/perhitungan-karbon";

// shortcut: dummy sample data copied from the design mock-up, replace after scientific methods and approved fixtures are settled (Q-04/Q-05).
export const PLOT_OPTIONS = [{ value: "PAM-04", label: "PAM-04" }];

export const FORMULAS: CarbonFormula[] = [
  {
    id: "agb",
    title: "Aboveground Biomass (AGB)",
    equation: "AGB = 0,251 x ρ x DBH^2,46",
    note: "ρ = desnsitas kayu jenis (g/sm2), penamaan umum Kemiyama dkk. (2005). Karbon tegakan = biomassa = 0,47 (IPXX 2006)",
  },
  {
    id: "bgb",
    title: "Belowground Biomass (BGB)",
    equation: "BGB = 0,199 x ρ^0,899 x DBH^2,22",
    note: "Biomassa akar di bawah permukaan, Komiyama dkk. (2005). Karbon akar = biomassa = 0,39 (Malk dkk. 2023)",
  },
];

export const CARBON_RESULTS: CarbonResult[] = [
  { id: "agc", label: "Stok Karbon Tegakan (AGC)", value: "89,9", unit: "ton C / ha" },
  { id: "bgc", label: "Stok Karbon Akar (BGC)", value: "29,8", unit: "ton C / ha", verified: true },
  { id: "biomass", label: "Total Biomassa Karbon", value: "119,7", unit: "ton C / ha (AGC + BGC)", verified: true, total: true },
  { id: "ecosystem", label: "Total Stok Karbon Ekosistem", value: "343,3", unit: "ton C / ha (AGC + BGC +SOC)", verified: true, total: true },
];

export const CARBON_TREES: CarbonTreeRow[] = [
  { id: "tree-1", species: "Rhizophora sp.", density: null, dbh: null, agb: null, agc: null, bgb: null, bgc: null },
  ...["tree-2", "tree-3", "tree-4", "tree-5"].map((id) => ({
    id,
    species: "Jenis belum dipilih",
    density: null,
    dbh: null,
    agb: null,
    agc: null,
    bgb: null,
    bgc: null,
  })),
];

export const CARBON_TOTALS: CarbonTotalRow[] = [
  { id: "total-1", plot: "Rhizophora sp.", agc: null, bgc: null, soc: null, total: null, co2e: null },
];
