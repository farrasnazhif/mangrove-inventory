"use client";

import { useState } from "react";
import { Sigma } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Typography } from "@/components/ui/typography";
import type { CarbonFormula } from "../types/perhitungan-karbon";

// shortcut: shared with bulk-density-soc, move to ui/ if a third feature needs it.
export function FormulaDialog({ formulas }: { formulas: CarbonFormula[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <Sigma size={14} aria-hidden />
        Rumus Perhitungan
      </Button>
      <Dialog open={open} onOpenChange={setOpen} title="Rumus Perhitungan" description="Persamaan dan sumber yang dipakai pada halaman ini.">
        <div className="flex flex-col gap-4">
          {formulas.map((formula) => (
            <div key={formula.id} className="overflow-hidden rounded-card border border-line">
              <Typography as="h3" variant="bs" weight="semibold" className="bg-inset px-4 py-3">
                {formula.title}
              </Typography>
              <div className="flex flex-col gap-3 p-4">
                <Typography as="p" variant="bs" weight="medium">{formula.equation}</Typography>
                <Typography as="p" variant="bs" className="text-ink-2">{formula.note}</Typography>
              </div>
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
}
