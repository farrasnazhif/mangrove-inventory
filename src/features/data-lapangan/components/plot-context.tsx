import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import type { PlotContextSummary } from "../types/data-lapangan";

export function PlotContext({ plot }: { plot: PlotContextSummary }) {
  return (
    <Card className="flex flex-col gap-4">
      <div>
        <Typography as="h2" variant="t" weight="semibold">
          Informasi Plot
        </Typography>
        <Typography as="p" variant="bs" className="mt-1 text-ink-2">
          Konteks contoh untuk tampilan pencatatan.
        </Typography>
      </div>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Typography as="dt" variant="c" weight="medium" className="text-ink-3">
            Kode plot
          </Typography>
          <Typography as="dd" variant="bs" weight="medium" className="mt-1">
            {plot.code}
          </Typography>
        </div>
        <div>
          <Typography as="dt" variant="c" weight="medium" className="text-ink-3">
            Lokasi
          </Typography>
          <Typography as="dd" variant="bs" weight="medium" className="mt-1">
            {plot.location}
          </Typography>
        </div>
        <div>
          <Typography as="dt" variant="c" weight="medium" className="text-ink-3">
            Tanggal survei
          </Typography>
          <Typography as="dd" variant="bs" weight="medium" className="mt-1">
            {plot.surveyDate}
          </Typography>
        </div>
        <div>
          <Typography as="dt" variant="c" weight="medium" className="text-ink-3">
            Luas plot
          </Typography>
          <Typography as="dd" variant="bs" weight="medium" className="mt-1">
            {plot.plotArea}
          </Typography>
        </div>
        <div>
          <Typography as="dt" variant="c" weight="medium" className="text-ink-3">
            Pencatat
          </Typography>
          <Typography as="dd" variant="bs" weight="medium" className="mt-1">
            {plot.surveyor}
          </Typography>
        </div>
      </dl>
    </Card>
  );
}
