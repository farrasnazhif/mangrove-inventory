import type { SoilFormula, SoilLayerRow } from "../types/bulk-density-soc";

// shortcut: dummy sample data copied from the design mock-up, replace after laboratory inputs and approved methods are settled (Q-04/Q-05).
export const PLOT_OPTIONS = [{ value: "PAM-04", label: "PAM-04" }];

export const SOIL_FORMULAS: SoilFormula[] = [
  {
    id: "bulk-density",
    title: "Bulk Density",
    equation: "PB = massa kering / volume inti",
    note: "Kerapatan lindak (g/cm2) tiap lapisan, dasar konversi karbon sedimen",
  },
  {
    id: "soc",
    title: "Soil Organic Carbon",
    equation: "DOC = PB x tebal x (%C/100) x 100",
    note: "%C = %LOI = 1,724 (Van Bemmelen. Hasil per lapisan dijumlahkan (Mg C/ha)",
  },
];

export const SOIL_LAYERS: SoilLayerRow[] = ["layer-1", "layer-2", "layer-3", "layer-4", "layer-5"].map((id) => ({
  id,
  depth: "16",
  thickness: null,
  dryMass: null,
  volume: null,
  loi: null,
  bulkDensity: null,
  carbonPercent: null,
  soc: null,
}));
