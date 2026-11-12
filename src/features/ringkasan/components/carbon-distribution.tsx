import { Typography } from "@/components/ui/typography";
import type { PlotSummary } from "../types/ringkasan";

const COMPARTMENTS = [
  { key: "agb", label: "Kanopi (AGB)", bar: "bg-green", text: "text-green" },
  { key: "bgb", label: "Akar (BGB)", bar: "bg-ink-3", text: "text-ink-3" },
  { key: "soc", label: "Sedimen (SOC)", bar: "bg-orange", text: "text-orange" },
] as const;

export function CarbonDistribution({ plot }: { plot: PlotSummary }) {
  const total = plot.agb + plot.bgb + plot.soc;
  return (
    <section aria-label="Distribusi kompartemen karbon" className="rounded-card bg-ink p-5 text-surface">
      <div className="flex items-center justify-between">
        <Typography as="h3" variant="c" weight="medium" className="uppercase tracking-wider text-surface">
          Distribusi kompartemen karbon
        </Typography>
        <Typography as="span" variant="bs" className="text-surface">Total 100%</Typography>
      </div>
      {/* the legend below repeats every value as text, so the bar is decorative */}
      <div className="mt-4 flex h-2 gap-0.5 overflow-hidden rounded-full bg-surface/15" aria-hidden>
        {COMPARTMENTS.map(({ key, bar }) => (
          <div key={key} className={bar} style={{ width: `${(plot[key] / total) * 100}%` }} />
        ))}
      </div>
      <dl className="mt-5 grid grid-cols-3 gap-4">
        {COMPARTMENTS.map(({ key, label, text }) => (
          <div key={key}>
            <dt className="text-[13px] text-surface">{label}</dt>
            <dd className={`mt-1 text-[13px] font-semibold ${text}`}>{plot[key].toFixed(1)} Mg C/ha</dd>
            <dd className="text-[13px] text-surface">{((plot[key] / total) * 100).toFixed(1)}%</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
