import { BadgeCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import type { CarbonResult } from "../types/perhitungan-karbon";

export function CarbonResults({ results }: { results: CarbonResult[] }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Ringkasan stok karbon">
      {results.map((result) => (
        <Card key={result.id} className={`flex flex-col gap-3 ${result.total ? "border border-dashed border-green" : ""}`}>
          <div className="flex items-center justify-between gap-2">
            <Typography as="h2" variant="c" weight="medium" className="uppercase tracking-wide text-ink-3">
              {result.label}
            </Typography>
            {result.verified && <BadgeCheck size={16} className="shrink-0 text-green" aria-label="Terverifikasi" />}
          </div>
          <Typography as="p" variant="t" weight="semibold">{result.value}</Typography>
          <Typography as="p" variant="bs" className={`border-t border-line pt-2 ${result.verified ? "text-green" : "text-ink-2"}`}>
            {result.unit}
          </Typography>
        </Card>
      ))}
    </section>
  );
}
