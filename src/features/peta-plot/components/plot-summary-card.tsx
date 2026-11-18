"use client";

import Link from "next/link";
import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { UNAVAILABLE, formatNumber } from "@/features/inventory/api/format";
import type { PlotStats } from "@/features/inventory/types/inventory";

const LINK = "text-[12px] font-medium text-ink underline underline-offset-4";

// starts closed: only the plot name and a chevron, the details open on click
export function PlotSummaryCard({
  stats,
  missingZone,
}: {
  stats: PlotStats;
  missingZone: string | null;
}) {
  return (
    <Card
      className="pointer-events-auto absolute right-3 top-3 z-10 w-44 max-w-[calc(100%-1.5rem)] p-0"
      aria-live="polite"
    >
      <Collapsible.Root>
        <Collapsible.Trigger className="group flex w-full items-center justify-between gap-3 rounded-card px-3 py-2 text-left">
          <Typography as="span" variant="bs" weight="semibold">
            {stats.plot.label}
          </Typography>
          <ChevronDown
            size={14}
            strokeWidth={2.5}
            aria-hidden
            className="shrink-0 transition-transform duration-150 group-data-[panel-open]:rotate-180 motion-reduce:transition-none"
          />
        </Collapsible.Trigger>
        <Collapsible.Panel>
          <div className="flex flex-col gap-1.5 px-3 pb-3">
            {missingZone && (
              <Typography as="p" variant="c" className="text-orange">
                Zona {missingZone}: data pohon tidak tersedia.
              </Typography>
            )}
            <Typography as="p" variant="c" className="text-ink-2">
              {stats.treeCount
                ? `${stats.treeCount} pohon · ${stats.speciesCount} jenis`
                : "Data pohon tidak tersedia"}
            </Typography>
            <Typography as="p" variant="c" className="text-ink-2">
              {stats.treeCount
                ? `${formatNumber(stats.carbon, 2)} ton C`
                : UNAVAILABLE}
            </Typography>
            <div className="flex justify-end gap-2 border-t border-line pt-2">
              <Link href="/data-lapangan" className={LINK}>
                Data
              </Link>
              /
              <Link href="/perhitungan-karbon" className={LINK}>
                Perhitungan
              </Link>
            </div>
          </div>
        </Collapsible.Panel>
      </Collapsible.Root>
    </Card>
  );
}
