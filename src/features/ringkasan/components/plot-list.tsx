"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { Typography } from "@/components/ui/typography";
import { ValuePill } from "@/components/ui/value-pill";
import type { PlotSummary } from "../types/ringkasan";
import { PlotNumber, plotTotal } from "./plot-detail";

const PAGE_SIZE = 6;

export function PlotList({
  plots,
  selectedId,
  onSelect,
}: {
  plots: PlotSummary[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(plots.length / PAGE_SIZE));
  const visible = plots.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Typography as="h2" variant="t" weight="semibold">Daftar Plot Inventarisasi</Typography>
        <ValuePill>{plots.length} PLOT</ValuePill>
      </div>
      <ul aria-label="Daftar plot" className="flex flex-col gap-1">
        {visible.map((plot) => {
          const active = plot.id === selectedId;
          return (
            <li key={plot.id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(plot.id)}
                className={`flex w-full items-center gap-3 rounded-card p-3 text-left transition-[background-color,transform] duration-150 active:scale-[0.99] ${active ? "bg-hover-2 shadow-hairline" : "hover:bg-hover-2"}`}
              >
                <PlotNumber code={plot.code} active={active} />
                <span className="min-w-0 flex-1">
                  <Typography as="span" variant="bl" weight="semibold" className="block">{plot.code}</Typography>
                  <Typography as="span" variant="bs" className="block truncate text-ink-2">{plot.site}</Typography>
                </span>
                <span className="shrink-0 text-right">
                  <Typography as="span" variant="bl" weight="semibold" className="block">
                    {plotTotal(plot).toFixed(1)}{" "}
                    <Typography as="span" variant="c" className="text-ink-3">Mg C/ha</Typography>
                  </Typography>
                  <Typography as="span" variant="bs" weight="medium" className="block text-green">{plot.trees} Pohon</Typography>
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
