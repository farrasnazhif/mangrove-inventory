import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import type { CarbonResult } from "../types/perhitungan-karbon";

export function CarbonResults({
  results,
  areaMissing,
}: {
  results: CarbonResult[];
  areaMissing: boolean;
}) {
  return (
    <section className="flex flex-col gap-3" aria-label="Ringkasan stok karbon">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {results.map((result) => (
          <Card
            key={result.id}
            className={`flex flex-col gap-3 ${result.total ? "border border-dashed border-green" : ""}`}
          >
            <Typography
              as="h2"
              variant="c"
              weight="medium"
              className="uppercase tracking-wide text-ink-3"
            >
              {result.label}
            </Typography>
            <Typography as="p" variant="t" weight="semibold">
              {result.value}
            </Typography>
            <Typography
              as="p"
              variant="bs"
              className="border-t border-line pt-2 text-ink-2"
            >
              {result.unit}
            </Typography>
          </Card>
        ))}
      </div>
      {areaMissing && (
        <Typography as="p" variant="bs" className="text-red-300 text-center">
          Nilai per hektar (ton C/ha) tidak tersedia: luas plot belum diisi.
        </Typography>
      )}
    </section>
  );
}
