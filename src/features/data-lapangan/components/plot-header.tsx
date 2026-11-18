import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Typography } from "@/components/ui/typography";
import { PLOT_OPTIONS } from "../constants/data-lapangan-data";

export function PlotHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <Typography as="h1" variant="h5" weight="semibold">Plot Lapangan & Sendimentasi</Typography>
      <div className="flex items-center gap-2">
        <Select options={PLOT_OPTIONS} defaultValue="PAM-04" triggerProps={{ "aria-label": "Pilih plot" }} />
        <Button variant="primary">
          <Plus size={14} aria-hidden />
          Input Plot
        </Button>
      </div>
    </header>
  );
}
