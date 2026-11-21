import { Typography } from "@/components/ui/typography";
import { UNAVAILABLE, formatNumber } from "@/features/inventory/api/format";
import type { PlotStats } from "@/features/inventory/types/inventory";

export function CarbonDistribution({ stats }: { stats: PlotStats }) {
  const parts = [
    { key: "agc", label: "Kanopi (AGC)", bar: "bg-[#22c55e]", text: "text-[#16a34a] dark:text-[#22c55e]", value: stats.agc },
    { key: "bgc", label: "Akar (BGC)", bar: "bg-[#22d3ee]", text: "text-[#0891b2] dark:text-[#22d3ee]", value: stats.bgc },
  ];
  return (
    <section aria-label="Distribusi kompartemen karbon" className="rounded-card bg-inset p-5 text-ink shadow-hairline">
      <div className="flex items-center justify-between gap-2">
        <Typography as="h3" variant="c" weight="medium" className="uppercase tracking-wider text-ink">
          Distribusi kompartemen karbon
        </Typography>
        <Typography as="span" variant="bs" className="text-ink">AGC + BGC = 100%</Typography>
      </div>
      {stats.carbon > 0 ? (
        <>
          {/* the legend below repeats every value as text, so the bar is decorative */}
          <div className="mt-4 flex h-2 gap-0.5 overflow-hidden rounded-full bg-ink/10" aria-hidden>
            {parts.map(({ key, bar, value }) => (
              <div key={key} className={bar} style={{ width: `${(value / stats.carbon) * 100}%` }} />
            ))}
          </div>
          <dl className="mt-5 grid grid-cols-3 gap-4">
            {parts.map(({ key, label, bar, text, value }) => (
              <div key={key}>
                <dt className="flex items-center gap-2 text-[13px] text-ink">
                  <span aria-hidden className={`size-3 shrink-0 rounded-[3px] ${bar}`} />
                  {label}
                </dt>
                <dd className={`mt-1 text-[13px] font-semibold ${text}`}>{formatNumber(value, 2)} ton C</dd>
                <dd className="text-[13px] text-ink">{formatNumber((value / stats.carbon) * 100)}%</dd>
              </div>
            ))}
            <div>
              <dt className="flex items-center gap-2 text-[13px] text-ink">
                <span aria-hidden className="size-3 shrink-0 rounded-[3px] bg-orange" />
                Sedimen (SOC)
              </dt>
              <dd className="mt-1 text-[13px] font-semibold text-orange">{stats.soc === null ? "-" : `${formatNumber(stats.soc, 2)} Mg C/ha`}</dd>
              <dd className="text-[13px] text-ink">{stats.soc === null ? UNAVAILABLE : "dari data inti sedimen"}</dd>
            </div>
          </dl>
        </>
      ) : (
        <Typography as="p" variant="bs" className="mt-4 text-ink">{UNAVAILABLE}: vak ini belum memiliki data pohon.</Typography>
      )}
    </section>
  );
}
