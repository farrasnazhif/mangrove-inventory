import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { UNAVAILABLE, formatNumber } from "@/features/inventory/api/format";
import type { PlotStats } from "@/features/inventory/types/inventory";

const LINK = "text-[13px] font-medium text-ink underline underline-offset-4";

export function PlotSummaryCard({ stats, missingZone }: { stats: PlotStats; missingZone: string | null }) {
  return (
    <Card className="pointer-events-auto absolute right-3 top-3 z-[1000] flex w-64 max-w-[calc(100%-1.5rem)] flex-col gap-2 p-4" aria-live="polite">
      <Typography as="p" variant="c" weight="medium" className="uppercase tracking-wide text-ink-3">Plot terpilih</Typography>
      <Typography as="h2" variant="bm" weight="semibold">{stats.plot.label}</Typography>
      {missingZone && (
        <Typography as="p" variant="bs" className="text-orange">Zona {missingZone}: data pohon tidak tersedia.</Typography>
      )}
      <Typography as="p" variant="bs" className="text-ink-2">
        {stats.treeCount ? `${stats.treeCount} pohon · ${stats.speciesCount} jenis` : "Data pohon tidak tersedia"}
      </Typography>
      <Typography as="p" variant="bs" className="text-ink-2">
        {stats.treeCount ? `${formatNumber(stats.carbon, 2)} ton C (AGC + BGC)` : UNAVAILABLE}
      </Typography>
      <div className="flex justify-between gap-3 border-t border-line pt-2">
        <Link href="/data-lapangan" className={LINK}>Data Lapangan</Link>
        <Link href="/perhitungan-karbon" className={LINK}>Perhitungan</Link>
      </div>
    </Card>
  );
}
