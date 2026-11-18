export type CarbonFormula = {
  id: string;
  title: string;
  equation: string;
  note: string;
};

export type CarbonResult = {
  id: string;
  label: string;
  value: string;
  unit: string;
  verified?: boolean;
  // dashed green outline marks the totals
  total?: boolean;
};

// null renders as an em dash
export type CarbonTreeRow = {
  id: string;
  species: string;
  density: string | null;
  dbh: string | null;
  agb: string | null;
  agc: string | null;
  bgb: string | null;
  bgc: string | null;
};

export type CarbonTotalRow = {
  id: string;
  plot: string;
  agc: string | null;
  bgc: string | null;
  soc: string | null;
  total: string | null;
  co2e: string | null;
};
