"use client";

import { useMemo } from "react";
import { formatNumber } from "@/features/inventory/api/format";
import { usePlotSelection } from "@/features/inventory/components/plot-provider";

const TOP = 6;

/** the most common species across all vaks: aggregate counts only, no vak-level data */
export function LandingSpecies() {
  const { all, total } = usePlotSelection();
  const top = useMemo(() => {
    const counts = new Map<string, number>();
    for (const { plot } of all) {
      for (const tree of plot.trees) {
        if (tree.species !== "Tidak teridentifikasi")
          counts.set(tree.species, (counts.get(tree.species) ?? 0) + 1);
      }
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, TOP);
  }, [all]);
  return (
    <section id="penghuni" className="l-section scroll-mt-16">
      <div className="l-container flex flex-col gap-10">
        <div className="max-w-2xl">
          <p className="l-eyebrow">jenis mangrove</p>
          <h2 className="l-h2">Jenis Mangrove yang Paling Banyak Tumbuh</h2>
          {/* <p className="l-lead mt-4">Enam jenis yang paling banyak tercatat di lokasi pengukuran.</p> */}
        </div>
        <ol className="l-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {top.map(([name, count], index) => (
            <li key={name} className="l-cell">
              <span className="l-serif text-[15px] text-[var(--l-eyebrow)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="l-h3 italic">{name}</h3>
              <p className="l-stat mt-auto">
                {formatNumber(count, 0)}
                <span className="ml-2 font-sans text-[16px] font-medium text-[var(--l-eyebrow)]">
                  pohon
                </span>
              </p>
              {/* the share is repeated as text under the bar */}
              <div
                className="h-2 overflow-hidden rounded-full bg-[var(--l-border)]"
                aria-hidden
              >
                <div
                  className="h-full rounded-full bg-[#22c55e]"
                  style={{ width: `${(count / total.treeCount) * 100}%` }}
                />
              </div>
              <p className="text-[13px] text-[var(--l-eyebrow)]">
                {formatNumber((count / total.treeCount) * 100)}% dari semua
                pohon
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
