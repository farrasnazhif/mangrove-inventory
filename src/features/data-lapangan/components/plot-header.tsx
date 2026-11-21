"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { PlotSelect } from "@/features/inventory/components/plot-select";
import { usePlotSelection } from "@/features/inventory/components/plot-provider";
import { ZONES } from "@/features/peta-plot/constants/zones";
import { RecordFormDialog } from "@/features/inventory/components/record-form-dialog";

export function PlotHeader() {
  const { all, addPlot } = usePlotSelection();
  const [open, setOpen] = useState(false);
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <Typography as="h1" variant="h5" weight="semibold">Vak Lapangan & Sendimentasi</Typography>
      <div className="flex items-center gap-2">
        <PlotSelect />
        <Button variant="primary" onClick={() => setOpen(true)}>
          <Plus size={14} aria-hidden />
          Input Vak
        </Button>
      </div>
      <RecordFormDialog
        open={open}
        onOpenChange={setOpen}
        title="Input Vak"
        description="Vak baru dibuat tanpa pohon dan sedimen; tambahkan datanya setelah dipilih. Perubahan hanya tersimpan selama halaman terbuka."
        fields={[
          { name: "label", kind: "text", label: "Wilayah / titik zonasi (nama vak)", required: true },
          { name: "zone", kind: "select", label: "Zona di peta", options: [{ value: "none", label: "Tanpa zona" }, ...ZONES.map((zone) => ({ value: zone.name, label: zone.name }))] },
          { name: "surveyDate", kind: "date", label: "Tanggal survei" },
          { name: "team", kind: "text", label: "Tim lapangan" },
          { name: "area", kind: "number", label: "Luas vak (ha)", min: 0.0001 },
          { name: "lat", kind: "number", label: "Latitude (mis. -7,3309)", min: -90, max: 90 },
          { name: "lng", kind: "number", label: "Longitude (mis. 112,8175)", min: -180, max: 180 },
        ]}
        onSubmit={(values) => {
          const label = String(values.label);
          if (all.some((item) => item.plot.label.toLowerCase() === label.toLowerCase())) return `Vak "${label}" sudah ada`;
          const lat = typeof values.lat === "number" ? values.lat : null;
          const lng = typeof values.lng === "number" ? values.lng : null;
          if ((lat === null) !== (lng === null)) return "Isi latitude dan longitude bersamaan";
          const zone = String(values.zone ?? "");
          addPlot({
            label,
            area: typeof values.area === "number" ? values.area : null,
            zones: zone && zone !== "none" ? [zone] : [],
            surveyDate: String(values.surveyDate ?? "") || null,
            team: String(values.team ?? "").trim() || null,
            center: lat !== null && lng !== null ? [lat, lng] : null,
          });
        }}
      />
    </header>
  );
}
