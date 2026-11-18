import type {
  PlotContextSummary,
  SedimentLayerRecord,
  TreeRecord,
} from "../types/data-lapangan";
import type { SelectOption } from "@/components/ui/select";

// shortcut: dummy sample data, replace after field schema and approved data access are settled.
export const PLOT_CONTEXT: PlotContextSummary = {
  code: "VAK-DEMO-01",
  location: "Contoh lokasi",
  surveyDate: "Belum diisi",
  plotArea: "Belum ditentukan",
  surveyor: "Belum diisi",
};

export const INITIAL_TREES: TreeRecord[] = [
  {
    id: "tree-01",
    code: "Pohon contoh 01",
    species: null,
    dbh: null,
    height: null,
  },
];

export const SPECIES_OPTIONS: SelectOption[] = [
  { value: "demo-species-a", label: "Contoh spesies A" },
  { value: "demo-species-b", label: "Contoh spesies B" },
];

export const INITIAL_SEDIMENT_LAYERS: SedimentLayerRecord[] = [
  {
    id: "layer-01",
    label: "Lapisan contoh 01",
    depthStart: null,
    depthEnd: null,
    dryMass: null,
    coreVolume: null,
    loi: null,
  },
];
