import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import type { SoilMethod } from "../types/bulk-density-soc";

export function SoilMethodCard({ method }: { method: SoilMethod }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <Typography as="h2" variant="t" weight="semibold">
          {method.title}
        </Typography>
        <Typography as="span" variant="c" weight="medium" className="text-orange">
          {method.status}
        </Typography>
      </div>
      <Typography as="p" variant="bs" className="text-ink-2">
        {method.description}
      </Typography>
    </Card>
  );
}
