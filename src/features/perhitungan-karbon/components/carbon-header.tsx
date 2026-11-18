import { Typography } from "@/components/ui/typography";
import { PlotSelect } from "@/features/inventory/components/plot-select";

export function CarbonHeader() {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <Typography as="h1" variant="h5" weight="semibold">Perhitungan Karbon</Typography>
        <Typography as="p" variant="bs" className="mt-1 text-ink-2">AGB, BGB, dan Stok Karbon Total</Typography>
      </div>
      <div>
        <PlotSelect />
      </div>
    </header>
  );
}
