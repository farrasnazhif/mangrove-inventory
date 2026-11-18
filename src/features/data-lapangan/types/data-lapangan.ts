export type PlotInfoCard = {
  id: string;
  label: string;
  value: string;
  detail: string;
  verified?: boolean;
  badge?: string;
  // coordinate card shows two actions instead of one detail line
  actions?: [string, string];
};

// null renders as an em dash
export type TreeRecord = {
  id: string;
  species: string | null;
  dbh: string | null;
  height: string | null;
  density: string | null;
};

export type SedimentLayerRecord = {
  id: string;
  depth: string;
  thickness: string | null;
  dryMass: string | null;
  volume: string | null;
  loi: string | null;
  bulkDensity: string | null;
  soc: string | null;
};
