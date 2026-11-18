"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { PlotMap } from "@/features/peta-plot/components/plot-map";
import { useZoneSelection } from "@/features/peta-plot/hooks/use-zone-selection";

export function SpatialMap() {
  const { missingZone, onSelectZone, selectedZones } = useZoneSelection();
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography as="h2" variant="t" weight="semibold">Sebaran Spasial</Typography>
        <Link href="/peta-plot" className="text-[14px] font-medium text-ink underline underline-offset-4">
          Peta Penuh
        </Link>
      </div>
      <div className="h-72 overflow-hidden rounded-card shadow-hairline">
        <PlotMap selectedZones={selectedZones} onSelectZone={onSelectZone} />
      </div>
      {missingZone && (
        <Typography as="p" variant="bs" className="text-orange">Zona {missingZone}: data pohon tidak tersedia.</Typography>
      )}
    </Card>
  );
}
