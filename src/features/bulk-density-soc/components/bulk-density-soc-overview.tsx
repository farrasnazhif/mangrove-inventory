import { Notice } from "@/components/ui/notice";
import { Typography } from "@/components/ui/typography";
import {
  SOIL_LAYERS,
  SOIL_METHODS,
} from "../constants/bulk-density-soc-data";
import { SocProfileResult } from "./soc-profile-result";
import { SoilLayerProfile } from "./soil-layer-profile";
import { SoilMethodCard } from "./soil-method-card";

export function BulkDensitySocOverview() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <Typography as="h1" variant="h5" weight="semibold">
          Bulk Density &amp; SOC
        </Typography>
        <Typography as="p" variant="bs" className="mt-1 text-ink-2">
          Metode, data laboratorium, dan ringkasan karbon organik tanah.
        </Typography>
      </header>
      <Notice tone="info">
        <Typography as="span" variant="bs">
          Tampilan demo. Data laboratorium dan metode konversi belum disetujui; hasil SOC belum
          tersedia.
        </Typography>
      </Notice>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2" aria-label="Metode tanah">
        {SOIL_METHODS.map((method) => (
          <SoilMethodCard key={method.id} method={method} />
        ))}
      </section>
      <SoilLayerProfile rows={SOIL_LAYERS} />
      <SocProfileResult />
    </div>
  );
}
