"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NumberInput } from "@/components/ui/number-input";
import { Table, type TableColumn } from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import type { SedimentLayerRecord } from "../types/data-lapangan";

export function SedimentLayers({
  rows,
  onAdd,
  onChange,
}: {
  rows: SedimentLayerRecord[];
  onAdd: () => void;
  onChange: (
    id: string,
    updates: Partial<
      Pick<
        SedimentLayerRecord,
        "depthStart" | "depthEnd" | "dryMass" | "coreVolume" | "loi"
      >
    >,
  ) => void;
}) {
  const numberColumn = (
    id: string,
    label: string,
    getValue: (row: SedimentLayerRecord) => number | null,
    field: "depthStart" | "depthEnd" | "dryMass" | "coreVolume" | "loi",
  ): TableColumn<SedimentLayerRecord> => ({
    id,
    label,
    value: (row) => getValue(row) ?? "—",
    render: (row) => (
      <NumberInput
        value={getValue(row)}
        onValueChange={(value) => onChange(row.id, { [field]: value })}
        inputProps={{ "aria-label": `${label} ${row.label}`, placeholder: "—" }}
      />
    ),
  });

  const columns: TableColumn<SedimentLayerRecord>[] = [
    { id: "label", label: "Lapisan", value: (row) => row.label },
    numberColumn("depth-start", "Kedalaman awal (cm)", (row) => row.depthStart, "depthStart"),
    numberColumn("depth-end", "Kedalaman akhir (cm)", (row) => row.depthEnd, "depthEnd"),
    numberColumn("dry-mass", "Massa kering", (row) => row.dryMass, "dryMass"),
    numberColumn("core-volume", "Volume inti (cm³)", (row) => row.coreVolume, "coreVolume"),
    numberColumn("loi", "LOI (%)", (row) => row.loi, "loi"),
  ];

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Typography as="h2" variant="t" weight="semibold">
            Sampel dan Lapisan Sedimen
          </Typography>
          <Typography as="p" variant="bs" className="mt-1 text-ink-2">
            Kolom ditampilkan sebagai ilustrasi; nilai laboratorium belum tersedia.
          </Typography>
        </div>
        <Button variant="secondary" onClick={onAdd}>
          <Plus size={14} aria-hidden />
          Tambah lapisan
        </Button>
      </div>
      <Table
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        caption="Contoh lapisan sedimen"
      />
    </Card>
  );
}
