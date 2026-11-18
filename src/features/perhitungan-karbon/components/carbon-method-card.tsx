import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import type { CarbonMethod } from "../types/perhitungan-karbon";

export function CarbonMethodCard({ method }: { method: CarbonMethod }) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <Typography as="h2" variant="t" weight="semibold">
          {method.name}
        </Typography>
        <Typography as="span" variant="c" weight="medium" className="text-orange">
          {method.status}
        </Typography>
      </div>
      <Typography as="p" variant="bs" className="text-ink-2">
        {method.compartment}
      </Typography>
      <div className="rounded-control border border-line bg-inset p-4">
        <Typography as="p" variant="c" weight="medium" className="text-ink-3">
          Persamaan dan sumber metode
        </Typography>
        <Typography as="p" variant="bs" className="mt-1">
          {method.reference}
        </Typography>
      </div>
    </Card>
  );
}
