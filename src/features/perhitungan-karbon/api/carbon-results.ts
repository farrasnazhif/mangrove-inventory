import { UNAVAILABLE, formatNumber } from "@/features/inventory/api/format";
import type { PlotStats } from "@/features/inventory/types/inventory";
import type { CarbonResult } from "../types/perhitungan-karbon";

/** the four summary cards for one plot, or for all plots together */
export const carbonResults = (stats: PlotStats): CarbonResult[] => [
  {
    id: "agc",
    label: "Stok Karbon Tegakan (AGC)",
    value: formatNumber(stats.agc, 2),
    unit: "ton C",
  },
  {
    id: "bgc",
    label: "Stok Karbon Akar (BGC)",
    value: formatNumber(stats.bgc, 2),
    unit: "ton C",
  },
  {
    id: "biomass",
    label: "Total Biomassa Karbon",
    value: formatNumber(stats.carbon, 2),
    unit:
      stats.carbonPerHa === null
        ? "ton C (AGC + BGC)"
        : `ton C (AGC + BGC) · ${formatNumber(stats.carbonPerHa, 2)} ton C/ha`,
    total: true,
  },
  {
    id: "ecosystem",
    label: "Total Stok Karbon Ekosistem",
    value:
      stats.ecosystemPerHa === null
        ? UNAVAILABLE
        : formatNumber(stats.ecosystemPerHa, 2),
    unit: "ton C/ha (AGC + BGC + SOC)",
    total: true,
  },
];
