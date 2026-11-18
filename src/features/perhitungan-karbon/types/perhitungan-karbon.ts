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
  // dashed green outline marks the totals
  total?: boolean;
};
