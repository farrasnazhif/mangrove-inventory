import { Card } from "@/components/ui/card";
import { Collapsible } from "@/components/ui/collapsible";
import { Typography } from "@/components/ui/typography";
import type { CarbonFormula } from "../types/perhitungan-karbon";

export function FormulaPanel({ formulas }: { formulas: CarbonFormula[] }) {
  return (
    <Card>
      <Collapsible label="Rumus Perhitungan" defaultOpen>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {formulas.map((formula) => (
            <div key={formula.id} className="overflow-hidden rounded-card border border-line">
              <Typography as="h2" variant="bs" weight="semibold" className="bg-inset px-4 py-3">
                {formula.title}
              </Typography>
              <div className="flex flex-col gap-3 p-4">
                <Typography as="p" variant="bs" weight="medium">{formula.equation}</Typography>
                <Typography as="p" variant="bs" className="text-ink-2">{formula.note}</Typography>
              </div>
            </div>
          ))}
        </div>
      </Collapsible>
    </Card>
  );
}
