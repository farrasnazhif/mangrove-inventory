export type CarbonMethod = {
  id: string;
  name: string;
  compartment: string;
  status: string;
  reference: string;
};

export type CarbonTreeRow = {
  id: string;
  tree: string;
  agb: string;
  agc: string;
  bgb: string;
  bgc: string;
};

export type CarbonResult = {
  id: string;
  label: string;
  value: string;
  unit: string;
};
