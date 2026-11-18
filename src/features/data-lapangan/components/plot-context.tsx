"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { plotCenter } from "@/features/inventory/api/inventory";
import {
  UNAVAILABLE,
  formatCoordinates,
  formatNumber,
} from "@/features/inventory/api/format";
import { SPECIES_POINTS } from "@/features/peta-plot/constants/species-points";
import { usePlotSelection } from "@/features/inventory/components/plot-provider";

function InfoCard({
  label,
  value,
  detail,
  badge,
  actions,
}: {
  label: string;
  value: string;
  detail?: string;
  badge?: string;
  actions?: string[];
}) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <Typography
          as="p"
          variant="c"
          weight="medium"
          className="uppercase tracking-wide text-ink-3"
        >
          {label}
        </Typography>
        {badge && <Badge>{badge}</Badge>}
      </div>
      <Typography as="p" variant="bm" weight="semibold">
        {value}
      </Typography>
      <div className="flex justify-between gap-2 border-t border-line pt-2">
        {actions?.map((action) => (
          <Typography
            key={action}
            as="span"
            variant="bs"
            className="text-ink-2"
          >
            {action}
          </Typography>
        ))}
        {detail && (
          <Typography as="p" variant="bs" className="text-ink-2">
            {detail}
          </Typography>
        )}
      </div>
    </Card>
  );
}

export function PlotContext() {
  const { stats } = usePlotSelection();
  const { plot, treeCount } = stats;
  const center = plotCenter(plot);
  const verified = plot.trees.filter((tree) => tree.qc === 0).length;
  const points = SPECIES_POINTS.filter((point) =>
    plot.zones.includes(point.zone),
  ).length;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <InfoCard
        label="Wilayah / Titik Zonasi"
        value={plot.label}
        detail={
          plot.zones.length
            ? `Zona peta ${plot.zones.join(" & ")} · ${points} titik spesies`
            : `Zona peta: ${UNAVAILABLE.toLowerCase()}`
        }
      />
      <InfoCard
        label="Survey Date & Tim Lapangan"
        value={
          plot.surveyDate
            ? new Date(plot.surveyDate).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "Tahun 2026"
        }
        detail={plot.team ?? `Tim lapangan: ${UNAVAILABLE.toLowerCase()}`}
      />
      <InfoCard
        label="Dimensi Plot & Skema Subplot"
        value={
          stats.area === null
            ? UNAVAILABLE
            : `${formatNumber(stats.area, 2)} ha`
        }
        detail={
          stats.area === null ? "Luas plot (ha) belum diisi" : "Dari input plot"
        }
      />
      <InfoCard
        label="Koordinat Geografis"
        value={center ? formatCoordinates(center) : UNAVAILABLE}
        // badge={
        //   treeCount
        //     ? `QC ${Math.round((verified / treeCount) * 100)}% OK`
        //     : undefined
        // }
        actions={["Data dari inputan"]}
      />
    </div>
  );
}
