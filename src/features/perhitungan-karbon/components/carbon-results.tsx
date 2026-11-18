import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import type { CarbonResult } from "../types/perhitungan-karbon";

export function CarbonResults({ results }: { results: CarbonResult[] }) {
  return (
    <section className="flex flex-col gap-4" aria-labelledby="carbon-results-title">
      <div>
        <Typography id="carbon-results-title" as="h2" variant="t" weight="semibold">
          Ringkasan Hasil
        </Typography>
        <Typography as="p" variant="bs" className="mt-1 text-ink-2">
          Nilai menunggu metode dan data yang telah disetujui.
        </Typography>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {results.map((result) => (
          <Card key={result.id} className="flex flex-col gap-3">
            <Typography as="h3" variant="bs" weight="medium" className="text-ink-2">
              {result.label}
            </Typography>
            <Typography as="p" variant="bl" weight="semibold">
              {result.value}
            </Typography>
            <Typography as="span" variant="c" className="text-ink-3">
              {result.unit}
            </Typography>
          </Card>
        ))}
      </div>
    </section>
  );
}
