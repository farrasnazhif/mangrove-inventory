import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

export function SpatialMap() {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography as="h2" variant="t" weight="semibold">Sebaran Spasial</Typography>
        <Link href="/peta-plot" className="text-[14px] font-medium text-ink underline underline-offset-4">
          Peta Penuh
        </Link>
      </div>
      {/* shortcut: placeholder panel, no map provider chosen (Q-06); swap for the plot map when approved */}
      <div className="flex h-72 flex-col items-center justify-center gap-2 rounded-card bg-inset text-ink-3 shadow-hairline">
        <MapPin size={28} aria-hidden />
        <Typography as="p" variant="bs">Peta plot belum tersedia</Typography>
      </div>
    </Card>
  );
}
