import type { ReactNode } from "react";
import { BadgeCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Typography } from "@/components/ui/typography";
import { ValuePill } from "@/components/ui/value-pill";
import { SUMMARY } from "../constants/ringkasan-data";

function MetricCard({ label, aside, children }: { label: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <Typography as="h3" variant="c" weight="medium" className="uppercase tracking-wider text-ink-3">
          {label}
        </Typography>
        {aside}
      </div>
      {children}
    </Card>
  );
}

function Stat({ value, unit }: { value: string; unit: string }) {
  return (
    <Typography as="p" variant="h5" weight="semibold">
      {value} <Typography as="span" variant="bl" weight="medium" className="text-ink-3">{unit}</Typography>
    </Typography>
  );
}

function Footnote({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="flex items-center justify-between border-t border-line pt-3 text-ink-2">
      <Typography as="span" variant="bs">{label}</Typography>
      <Typography as="span" variant="bs" weight="medium" className={tone ?? "text-ink"}>{value}</Typography>
    </div>
  );
}

export function SummaryMetrics() {
  const { meanStock, co2e, coverage, dominantSpecies } = SUMMARY;
  const percent = Math.round((coverage.measured / coverage.total) * 100);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Rata-rata cadangan">
        <Stat value={meanStock.value} unit="Mg C/ha" />
        <div className="flex justify-between border-t border-line pt-3 text-ink-2">
          {[["AGB", meanStock.agb], ["BGB", meanStock.bgb], ["SOC", meanStock.soc]].map(([name, value]) => (
            <Typography key={name} as="span" variant="bs">{name} {value}</Typography>
          ))}
        </div>
      </MetricCard>
      <MetricCard label="Serapan CO₂e" aside={<BadgeCheck size={16} className="text-green" aria-hidden />}>
        <Stat value={co2e.value} unit="Mg/ha" />
        <Footnote label="Ekuivalen Gas" value={co2e.method} tone="text-green" />
      </MetricCard>
      <MetricCard label="Cakupan plot">
        <Stat value={String(coverage.measured)} unit={`/ ${coverage.total} Plot`} />
        <ProgressBar label="Plot terukur" value={percent} aria-label="Cakupan plot" />
      </MetricCard>
      <MetricCard label="Spesies dominan" aside={<ValuePill>{dominantSpecies.inp}</ValuePill>}>
        <Typography as="p" variant="t" weight="semibold" className="italic">{dominantSpecies.names}</Typography>
        <Footnote label="Kerapatan" value={dominantSpecies.density} />
      </MetricCard>
    </div>
  );
}
