"use client";

import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Typography } from "@/components/ui/typography";
import { ValuePill } from "@/components/ui/value-pill";
import { UNAVAILABLE, formatNumber } from "@/features/inventory/api/format";
import { usePlotSelection } from "@/features/inventory/components/plot-provider";

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
  const { all, total } = usePlotSelection();
  const measured = all.filter((stats) => stats.treeCount > 0).length;
  const percent = Math.round((measured / all.length) * 100);
  const dominant = total.dominant;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Total stok karbon">
        <Stat value={formatNumber(total.carbon, 1)} unit="ton C" />
        <div className="flex flex-wrap justify-between gap-x-3 border-t border-line pt-3 text-ink-2">
          {[["AGC", formatNumber(total.agc, 1)], ["BGC", formatNumber(total.bgc, 1)], ["SOC", "-"]].map(([name, value]) => (
            <Typography key={name} as="span" variant="bs">{name} {value}</Typography>
          ))}
        </div>
      </MetricCard>
      <MetricCard label="Setara CO₂e">
        <Stat value={formatNumber(total.co2e, 1)} unit="ton CO₂e" />
        <Footnote label="Per hektar" value={UNAVAILABLE} />
      </MetricCard>
      <MetricCard label="Cakupan plot">
        <Stat value={String(measured)} unit={`/ ${all.length} Plot`} />
        <ProgressBar label="Plot dengan data pohon" value={percent} aria-label="Cakupan plot" />
      </MetricCard>
      <MetricCard label="Spesies dominan" aside={dominant && <ValuePill>{formatNumber((dominant.count / total.treeCount) * 100)}%</ValuePill>}>
        <Typography as="p" variant="t" weight="semibold" className="italic">{dominant?.name ?? UNAVAILABLE}</Typography>
        <Footnote label="Jumlah pohon" value={dominant ? formatNumber(dominant.count, 0) : "-"} />
      </MetricCard>
    </div>
  );
}
