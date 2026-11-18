import type { CarbonFormula } from "@/features/perhitungan-karbon/types/perhitungan-karbon";

export type SoilFormula = CarbonFormula;

// null renders as an em dash
export type SoilLayerRow = {
  id: string;
  depth: string;
  thickness: string | null;
  dryMass: string | null;
  volume: string | null;
  loi: string | null;
  bulkDensity: string | null;
  carbonPercent: string | null;
  soc: string | null;
};
