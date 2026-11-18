"use client";

import { Typography } from "@/components/ui/typography";
import { FORMULAS } from "@/features/inventory/constants/method";
import { usePlotSelection } from "@/features/inventory/components/plot-provider";
import { carbonResults } from "@/features/perhitungan-karbon/api/carbon-results";
import { CarbonResults } from "@/features/perhitungan-karbon/components/carbon-results";
import { FormulaDialog } from "@/features/perhitungan-karbon/components/formula-dialog";

/** the all-plot carbon totals and how they are calculated, without any per-plot or per-tree numbers */
export function LandingAggregate() {
  const { total } = usePlotSelection();
  return (
    <section aria-labelledby="landing-aggregate" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Typography id="landing-aggregate" as="h2" variant="t" weight="semibold">Perhitungan Karbon</Typography>
          <Typography as="p" variant="bs" className="mt-1 text-ink-2">Total seluruh plot, dari biomassa di atas dan di bawah permukaan.</Typography>
        </div>
        <FormulaDialog formulas={FORMULAS} />
      </div>
      <CarbonResults results={carbonResults(total)} areaMissing={false} />
    </section>
  );
}
