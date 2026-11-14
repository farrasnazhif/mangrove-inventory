import { PlotMap } from "./plot-map";

export function PetaPlotOverview() {
  // fills the area under the top bar; the shell drops its page padding on this route
  return (
    <div className="h-[calc(100dvh-3.5rem)] w-full">
      <PlotMap />
    </div>
  );
}
