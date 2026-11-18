"use client";

import { Select } from "@/components/ui/select";
import { usePlotSelection } from "./plot-provider.tsx";

export function PlotSelect() {
  const { stats, all, select } = usePlotSelection();
  const options = all.map(({ plot, treeCount }) => ({ value: plot.key, label: `${plot.label} (${treeCount} pohon)` }));
  return (
    <Select
      options={options}
      value={stats.plot.key}
      onValueChange={(key) => key && select(key)}
      triggerProps={{ "aria-label": "Pilih plot" }}
    />
  );
}
