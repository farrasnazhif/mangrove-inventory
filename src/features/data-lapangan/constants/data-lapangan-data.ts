import type { PlotInfoCard, SedimentLayerRecord, TreeRecord } from "../types/data-lapangan";

// shortcut: dummy sample data copied from the design mock-up, replace after field schema and approved data access are settled.
export const PLOT_OPTIONS = [{ value: "PAM-04", label: "PAM-04" }];

export const PLOT_INFO: PlotInfoCard[] = [
  { id: "region", label: "Wilayah / Titik Zonasi", value: "Wonorejo Inertidal", detail: "Sektor Mangrove Muara Timur" },
  { id: "survey", label: "Survey Date & Tim Lapangan", value: "14 Oktober 2026", detail: "Budi Santoso", verified: true },
  { id: "dimension", label: "Dimensi Plot & Skema Subplot", value: "10m x 10m", detail: "Kuadran Tunggal Standar SNI", verified: true },
  { id: "coordinate", label: "Koordinat Geografis", value: `7°18'42.14" S 112°49'15.38" E`, detail: "", badge: "INP 78%", actions: ["Perbarui dari GPS", "Input Manual"] },
];

const emptyTree = (id: string): TreeRecord => ({ id, species: null, dbh: null, height: null, density: null });

export const TREES: TreeRecord[] = [
  { id: "tree-1", species: "Rhizophora sp.", dbh: "16.2", height: null, density: null },
  ...["tree-2", "tree-3", "tree-4", "tree-5"].map(emptyTree),
];

export const SEDIMENT_LAYERS: SedimentLayerRecord[] = ["layer-1", "layer-2", "layer-3", "layer-4", "layer-5"].map((id) => ({
  id,
  depth: "16",
  thickness: null,
  dryMass: null,
  volume: null,
  loi: null,
  bulkDensity: null,
  soc: null,
}));
