export type LatLng = [number, number];

export type PlotZone = { name: string; corners: LatLng[] };

export type SpeciesPoint = {
  id: number;
  zone: string;
  species: string;
  note: string;
  position: LatLng;
};
