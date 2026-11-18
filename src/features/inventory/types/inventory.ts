export type SpeciesRow = [name: string, family: string, group: string, rho: number, rhoBasis: string];
export type PlotRow = [label: string, zones: string[]];
// qc: 0 OK, 1 corrected during cleaning, 2 needs field verification
export type TreeRow = [plot: number, tag: number, species: number, dbh: number, qc: 0 | 1 | 2, note?: string];

export type Tree = {
  id: string;
  tag: number;
  species: string;
  group: string;
  rho: number;
  dbh: number;
  /** metres; the source data has none and the equations do not need it */
  height: number | null;
  qc: 0 | 1 | 2;
  note?: string;
};

export type TreeCarbon = { agb: number; bgb: number; agc: number; bgc: number; carbon: number; co2e: number };

// one sediment layer: inputs only, PB / %C / SOC are derived
export type SedimentCore = { id: string; depth: number; thickness: number; dryMass: number; volume: number; loi: number };

export type Plot = {
  key: string;
  label: string;
  zones: string[];
  /** hectares; null until entered, the source workbook has none */
  area: number | null;
  surveyDate: string | null;
  team: string | null;
  /** [lat, lng] entered by hand; overrides the map zone centre */
  center: [number, number] | null;
  trees: Tree[];
  cores: SedimentCore[];
};

/** biomass and carbon in kg per tree, tonnes per plot; no SOC or per-hectare values exist in the source data */
export type PlotStats = TreeCarbon & {
  plot: Plot;
  treeCount: number;
  speciesCount: number;
  meanDbh: number | null;
  dominant: { name: string; count: number } | null;
  area: number | null;
  /** AGC + BGC in ton C/ha, needs the plot area */
  carbonPerHa: number | null;
  /** Mg C/ha summed over the sediment layers, null without layers */
  soc: number | null;
  /** AGC + BGC + SOC in ton C/ha, needs area and sediment layers */
  ecosystemPerHa: number | null;
};
