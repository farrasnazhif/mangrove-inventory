import type { SoilLayerRow, SoilMethod } from "../types/bulk-density-soc";

// shortcut: dummy sample data, replace after laboratory inputs and approved methods are settled.
export const SOIL_METHODS: SoilMethod[] = [
  {
    id: "bulk-density",
    title: "Bulk Density (BD)",
    status: "Metode menunggu persetujuan",
    description: "Rincian persamaan dan acuan belum ditetapkan.",
  },
  {
    id: "soc",
    title: "Soil Organic Carbon (SOC)",
    status: "Metode menunggu persetujuan",
    description: "Konversi karbon organik dan agregasi belum ditetapkan.",
  },
];

export const SOIL_LAYERS: SoilLayerRow[] = [
  {
    id: "layer-01",
    layer: "Lapisan contoh 01",
    depth: "—",
    dryMass: "—",
    coreVolume: "—",
    loi: "—",
    bulkDensity: "—",
    carbonPercent: "—",
    soc: "—",
  },
];
