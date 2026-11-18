// Parameters from the workbook sheet "Metode & Parameter". shortcut: taken from the research workbook, not yet approved as the product equations (Q-04/Q-05).
export const METHOD = {
  agb: { a: 0.251, dbhExp: 2.46 },
  bgb: { a: 0.199, rhoExp: 0.899, dbhExp: 2.22 },
  carbonFraction: { agb: 0.47, bgb: 0.39 },
  co2PerC: 44 / 12,
};

export const FORMULAS = [
  {
    id: "agb",
    title: "Aboveground Biomass (AGB)",
    equation: "AGB = 0,251 × ρ × DBH^2,46",
    note: "AGB dalam kg per pohon, DBH dalam cm, ρ (densitas kayu) dalam g/cm³. Komiyama dkk. (2005), persamaan umum mangrove; jenis non-mangrove tetap dihitung dengan persamaan yang sama (pendekatan). Karbon AGB = AGB × 0,47 (IPCC 2006).",
  },
  {
    id: "bgb",
    title: "Belowground Biomass (BGB)",
    equation: "BGB = 0,199 × ρ^0,899 × DBH^2,22",
    note: "Biomassa akar di bawah permukaan, Komiyama dkk. (2005). Karbon BGB = BGB × 0,39 (Kauffman & Donato 2012). CO₂e = karbon × 44/12.",
  },
];
