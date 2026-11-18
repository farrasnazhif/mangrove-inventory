import type {
  CarbonMethod,
  CarbonResult,
  CarbonTreeRow,
} from "../types/perhitungan-karbon";

// shortcut: dummy sample data, replace after scientific methods and approved fixtures are settled.
export const CARBON_METHODS: CarbonMethod[] = [
  {
    id: "agb",
    name: "AGB",
    compartment: "Biomassa atas permukaan",
    status: "Metode menunggu persetujuan",
    reference: "Persamaan dan koefisien belum ditetapkan.",
  },
  {
    id: "bgb",
    name: "BGB",
    compartment: "Biomassa bawah permukaan",
    status: "Metode menunggu persetujuan",
    reference: "Persamaan dan koefisien belum ditetapkan.",
  },
];

export const CARBON_TREES: CarbonTreeRow[] = [
  {
    id: "tree-01",
    tree: "Pohon contoh 01",
    agb: "Belum dihitung",
    agc: "Belum dihitung",
    bgb: "Belum dihitung",
    bgc: "Belum dihitung",
  },
  {
    id: "tree-02",
    tree: "Pohon contoh 02",
    agb: "Belum dihitung",
    agc: "Belum dihitung",
    bgb: "Belum dihitung",
    bgc: "Belum dihitung",
  },
];

export const CARBON_RESULTS: CarbonResult[] = [
  { id: "agc", label: "Karbon atas permukaan (AGC)", value: "Belum tersedia", unit: "Mg C/ha" },
  { id: "bgc", label: "Karbon bawah permukaan (BGC)", value: "Belum tersedia", unit: "Mg C/ha" },
  { id: "total", label: "Total karbon biomassa", value: "Belum tersedia", unit: "Mg C/ha" },
];
