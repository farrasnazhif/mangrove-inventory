"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { Typography } from "@/components/ui/typography";
import { ValuePill } from "@/components/ui/value-pill";
import { UNAVAILABLE, formatNumber } from "@/features/inventory/api/format";
import { usePlotSelection } from "@/features/inventory/components/plot-provider";
import { PlotNumber } from "./plot-detail";

const PAGE_SIZE = 6;

export function PlotList() {
  const { stats: selected, all, select } = usePlotSelection();
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(all.length / PAGE_SIZE);
  const visible = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Typography as="h2" variant="t" weight="semibold">Daftar Plot Inventarisasi</Typography>
        <ValuePill>{all.length} PLOT</ValuePill>
      </div>
      <ul aria-label="Daftar plot" className="flex flex-col gap-1">
        {visible.map((stats) => {
          const active = stats === selected;
          return (
            <li key={stats.plot.key}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => select(stats.plot.key)}
                className={`flex w-full items-center gap-3 rounded-card p-3 text-left transition-[background-color,transform] duration-150 active:scale-[0.99] ${active ? "bg-hover-2 shadow-hairline" : "hover:bg-hover-2"}`}
              >
                <PlotNumber index={all.indexOf(stats)} active={active} />
                <span className="min-w-0 flex-1">
                  <Typography as="span" variant="bl" weight="semibold" className="block truncate">{stats.plot.label}</Typography>
                  <Typography as="span" variant="bs" className="block truncate text-ink-2">
                    {stats.treeCount ? `${stats.speciesCount} jenis` : UNAVAILABLE}
                  </Typography>
                </span>
                <span className="shrink-0 text-right">
                  <Typography as="span" variant="bl" weight="semibold" className="block">
                    {stats.treeCount ? formatNumber(stats.carbon, 1) : "-"}{" "}
                    <Typography as="span" variant="c" className="text-ink-3">ton C</Typography>
                  </Typography>
                  <Typography as="span" variant="bs" weight="medium" className="block text-green">{stats.treeCount} Pohon</Typography>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto border-t border-line pt-3">
        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
      </div>
    </Card>
  );
}
