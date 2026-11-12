import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import type { PlotSummary } from "../types/ringkasan";
import { CarbonDistribution } from "./carbon-distribution";
import { PlotPhotos } from "./plot-photos";

export const plotTotal = (plot: PlotSummary) => plot.agb + plot.bgb + plot.soc;

export function PlotNumber({ code, active = false }: { code: string; active?: boolean }) {
  return (
    <span
      className={`flex size-10 shrink-0 items-center justify-center rounded-control text-[14px] font-semibold ${active ? "bg-ink text-surface" : "bg-field text-ink-2"}`}
    >
      {code.slice(-2)}
    </span>
  );
}

export function PlotDetail({ plot }: { plot: PlotSummary }) {
  return (
    <Card className="flex flex-col gap-6" aria-live="polite">
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <PlotNumber code={plot.code} active />
          <div className="min-w-0">
            <Typography as="h2" variant="t" weight="semibold">{plot.code}</Typography>
            <Typography as="p" variant="bs" className="truncate text-ink-2">
              {plot.site} • {plot.coordinates}
            </Typography>
          </div>
        </div>
        <Typography as="p" variant="h5" weight="semibold" className="shrink-0">
          {plotTotal(plot).toFixed(1)}{" "}
          <Typography as="span" variant="bs" weight="medium" className="text-ink-3">Mg C/ha</Typography>
        </Typography>
      </div>
      <CarbonDistribution plot={plot} />
      <PlotPhotos photos={plot.photos} />
    </Card>
  );
}
