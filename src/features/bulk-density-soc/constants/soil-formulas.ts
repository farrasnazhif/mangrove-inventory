import type { CarbonFormula } from "@/features/perhitungan-karbon/types/perhitungan-karbon";

// Text from the workbook sheet "Metode & Parameter". shortcut: not yet approved as product equations (Q-04/Q-05); the workbook states SOC is not calculated because sediment data is missing.
export const SOIL_FORMULAS: CarbonFormula[] = [
  {
    id: "bulk-density",
    title: "Bulk Density",
    equation: "PB = massa kering / volume inti",
    note: "Kerapatan lindak (g/cm3) tiap lapisan, dasar konversi karbon sedimen.",
  },
  {
    id: "soc",
    title: "Soil Organic Carbon",
    equation: "SOC = PB × %C × tebal lapisan",
    note: "%C = %LOI / 1,724 (Van Bemmelen). Hasil per lapisan dijumlahkan dalam Mg C/ha. Tanpa data lapisan, SOC tidak dihitung.",
  },
];
