import { Notice } from "@/components/ui/notice";
import { Typography } from "@/components/ui/typography";
import {
  CARBON_METHODS,
  CARBON_RESULTS,
  CARBON_TREES,
} from "../constants/perhitungan-karbon-data";
import { CarbonMethodCard } from "./carbon-method-card";
import { CarbonResults } from "./carbon-results";
import { TreeCalculations } from "./tree-calculations";

export function PerhitunganKarbonOverview() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <Typography as="h1" variant="h5" weight="semibold">
          Perhitungan Karbon
        </Typography>
        <Typography as="p" variant="bs" className="mt-1 text-ink-2">
          Tinjau metode dan rincian karbon untuk data pohon.
        </Typography>
      </header>
      <Notice tone="info">
        <Typography as="span" variant="bs">
          Perhitungan dinonaktifkan sampai persamaan, koefisien, dan input disetujui. Tidak ada
          nilai karbon yang dihasilkan pada tampilan demo ini.
        </Typography>
      </Notice>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2" aria-label="Metode perhitungan">
        {CARBON_METHODS.map((method) => (
          <CarbonMethodCard key={method.id} method={method} />
        ))}
      </section>
      <TreeCalculations rows={CARBON_TREES} />
      <CarbonResults results={CARBON_RESULTS} />
    </div>
  );
}
