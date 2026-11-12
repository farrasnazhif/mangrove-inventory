import type { PlotPhoto, PlotSummary } from "../types/ringkasan";

// shortcut: dummy sample data, not field measurements; replace with the query layer once Q-04/Q-05 settle.

export const STUDY = {
  title: "Stok Karbon Mangrove Pamurbaya",
  location: "Wonorejo & Gunung Anyar, Surabaya",
};

export const SUMMARY = {
  meanStock: { value: "148.6", agb: "68.4", bgb: "22.8", soc: "57.4" },
  co2e: { value: "545.3", method: "Tier 3 IPCC" },
  coverage: { measured: 12, total: 16 },
  dominantSpecies: { names: "A. marina & R. mucronata", density: "1,420 /ha", inp: "INP 78%" },
};

const PHOTOS: PlotPhoto[] = [
  { label: "Kanopi", caption: "Strata Kanopi", note: "18 pohon/100m²" },
  { label: "Sedimen inti", caption: "Core 0-50cm", note: "C-Org 4.82%" },
];

const plot = (
  code: string,
  site: string,
  coordinates: string,
  agb: number,
  bgb: number,
  soc: number,
  trees: number,
): PlotSummary => ({ id: code, code, site, coordinates, agb, bgb, soc, trees, photos: PHOTOS });

export const PLOTS: PlotSummary[] = [
  plot("VAK-04", "Estuari Wonorejo", `7°18'42"S, 112°49'15"E`, 84.2, 28.6, 69.6, 5),
  plot("VAK-01", "Wonorejo Rivermouth", `7°18'40"S, 112°49'02"E`, 71.5, 24.1, 58.6, 8),
  plot("VAK-02", "Wonorejo Tambak B", `7°18'51"S, 112°49'20"E`, 66.3, 22.0, 61.9, 8),
  plot("VAK-03", "Gunung Anyar Pesisir", `7°20'05"S, 112°49'48"E`, 70.8, 23.9, 59.5, 8),
  plot("VAK-05", "Gunung Anyar Tambak", `7°20'12"S, 112°50'01"E`, 62.4, 20.7, 55.1, 8),
  plot("VAK-06", "Gunung Anyar Tambak", `7°20'18"S, 112°50'09"E`, 59.9, 19.8, 52.3, 7),
  plot("VAK-07", "Wonorejo Muara", `7°18'33"S, 112°49'30"E`, 77.1, 25.6, 63.0, 6),
  plot("VAK-08", "Wonorejo Muara", `7°18'29"S, 112°49'41"E`, 73.4, 24.8, 60.2, 6),
  plot("VAK-09", "Gunung Anyar Barat", `7°19'58"S, 112°49'33"E`, 64.0, 21.3, 54.8, 7),
  plot("VAK-10", "Gunung Anyar Barat", `7°19'52"S, 112°49'25"E`, 68.7, 22.9, 57.7, 9),
  plot("VAK-11", "Wonorejo Utara", `7°18'20"S, 112°49'10"E`, 80.6, 27.2, 66.4, 5),
  plot("VAK-12", "Wonorejo Utara", `7°18'15"S, 112°49'22"E`, 75.9, 25.1, 62.3, 6),
];
