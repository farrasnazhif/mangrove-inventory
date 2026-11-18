"use client";

import { useMemo } from "react";
import { usePlotSelection } from "@/features/inventory/components/plot-provider";

/** slow marquee of the species names found in the plots, in the place of relae.co's client-logo strip */
export function LandingTicker() {
  const { all, total } = usePlotSelection();
  const names = useMemo(() => {
    const unique = new Set<string>();
    for (const { plot } of all) for (const tree of plot.trees) if (tree.species !== "Tidak teridentifikasi") unique.add(tree.species);
    return [...unique].sort((a, b) => a.localeCompare(b));
  }, [all]);
  return (
    <section aria-label="Jenis tumbuhan yang tercatat" className="border-y border-[var(--l-border-strong)] py-8">
      <p className="l-eyebrow text-center">Tercatat {total.speciesCount} jenis tumbuhan</p>
      <div className="overflow-hidden">
        {/* the list is doubled so the loop is seamless; the copy is hidden from screen readers */}
        <div className="landing-marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-12">
              {names.map((name) => (
                <li key={name} className="l-serif whitespace-nowrap text-[20px] italic text-[var(--l-accent)]">
                  {name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
