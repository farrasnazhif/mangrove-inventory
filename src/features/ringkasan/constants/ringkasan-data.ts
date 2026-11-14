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

const dms = (value: number, positive: string, negative: string) => {
  const abs = Math.abs(value);
  const deg = Math.floor(abs);
  const min = Math.floor((abs - deg) * 60);
  const sec = Math.floor(((abs - deg) * 60 - min) * 60);
  return `${deg}°${min}'${sec}"${value >= 0 ? positive : negative}`;
};

// shortcut: dummy 4 x 3 grid of plot centres near Wonorejo, replace with surveyed plot positions.
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const gridPosition = (code: string): [number, number] => {
  const index = ROMAN.indexOf(code.replace("Vak ", ""));
  return [-7.33083 + (1 - Math.floor(index / 4)) * 0.00068, 112.81778 + ((index % 4) - 1.5) * 0.00078];
};

const plot = (
  code: string,
  site: string,
  agb: number,
  bgb: number,
  soc: number,
  trees: number,
): PlotSummary => {
  const position = gridPosition(code);
  const coordinates = `${dms(position[0], "N", "S")}, ${dms(position[1], "E", "W")}`;
  return { id: code, code, site, coordinates, position, agb, bgb, soc, trees, photos: PHOTOS };
};

export const PLOTS: PlotSummary[] = [
  plot("Vak IV", "Estuari Wonorejo", 84.2, 28.6, 69.6, 5),
  plot("Vak I", "Wonorejo Rivermouth", 71.5, 24.1, 58.6, 8),
  plot("Vak II", "Wonorejo Tambak B", 66.3, 22.0, 61.9, 8),
  plot("Vak III", "Gunung Anyar Pesisir", 70.8, 23.9, 59.5, 8),
  plot("Vak V", "Gunung Anyar Tambak", 62.4, 20.7, 55.1, 8),
  plot("Vak VI", "Gunung Anyar Tambak", 59.9, 19.8, 52.3, 7),
  plot("Vak VII", "Wonorejo Muara", 77.1, 25.6, 63.0, 6),
  plot("Vak VIII", "Wonorejo Muara", 73.4, 24.8, 60.2, 6),
  plot("Vak IX", "Gunung Anyar Barat", 64.0, 21.3, 54.8, 7),
  plot("Vak X", "Gunung Anyar Barat", 68.7, 22.9, 57.7, 9),
  plot("Vak XI", "Wonorejo Utara", 80.6, 27.2, 66.4, 5),
  plot("Vak XII", "Wonorejo Utara", 75.9, 25.1, 62.3, 6),
];
