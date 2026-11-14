export type PlotPhoto = { label: string; caption: string; note: string };

export type PlotSummary = {
  id: string;
  code: string;
  site: string;
  coordinates: string;
  /** [latitude, longitude] in decimal degrees — dummy sample position */
  position: [number, number];
  /** Mg C/ha per compartment — dummy values, not an approved calculation (Q-04) */
  agb: number;
  bgb: number;
  soc: number;
  trees: number;
  photos: PlotPhoto[];
};
