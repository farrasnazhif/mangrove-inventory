import type { Metadata } from "next";
import { PetaPlotScreen } from "@/features/peta-plot/components/peta-plot-screen";

export const metadata: Metadata = { title: "Peta Plot" };

export default function PetaPlotPage() {
  return <PetaPlotScreen />;
}
