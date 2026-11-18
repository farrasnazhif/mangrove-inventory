export type PlotContextSummary = {
  code: string;
  location: string;
  surveyDate: string;
  plotArea: string;
  surveyor: string;
};

export type TreeRecord = {
  id: string;
  code: string;
  species: string | null;
  dbh: number | null;
  height: number | null;
};

export type SedimentLayerRecord = {
  id: string;
  label: string;
  depthStart: number | null;
  depthEnd: number | null;
  dryMass: number | null;
  coreVolume: number | null;
  loi: number | null;
};
