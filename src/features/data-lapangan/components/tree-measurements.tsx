"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NumberInput } from "@/components/ui/number-input";
import { Select } from "@/components/ui/select";
import { Table, type TableColumn } from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import { SPECIES_OPTIONS } from "../constants/data-lapangan-data";
import type { TreeRecord } from "../types/data-lapangan";

export function TreeMeasurements({
  rows,
  onAdd,
  onChange,
}: {
  rows: TreeRecord[];
  onAdd: () => void;
  onChange: (
    id: string,
    updates: Partial<Pick<TreeRecord, "species" | "dbh" | "height">>,
  ) => void;
}) {
  const columns: TableColumn<TreeRecord>[] = [
    { id: "code", label: "Pohon", value: (row) => row.code },
    {
      id: "species",
      label: "Spesies",
      value: (row) => row.species ?? "Belum dipilih",
      render: (row) => (
        <Select
          options={SPECIES_OPTIONS}
          value={row.species}
          onValueChange={(species) => onChange(row.id, { species })}
          placeholder="Pilih contoh spesies"
          triggerProps={{ "aria-label": `Spesies ${row.code}` }}
        />
      ),
    },
    {
      id: "dbh",
      label: "DBH (cm)",
      value: (row) => row.dbh ?? "—",
      render: (row) => (
        <NumberInput
          value={row.dbh}
          onValueChange={(dbh) => onChange(row.id, { dbh })}
          inputProps={{ "aria-label": `DBH ${row.code}`, placeholder: "—" }}
        />
      ),
    },
    {
      id: "height",
      label: "Tinggi (m)",
      value: (row) => row.height ?? "—",
      render: (row) => (
        <NumberInput
          value={row.height}
          onValueChange={(height) => onChange(row.id, { height })}
          inputProps={{ "aria-label": `Tinggi ${row.code}`, placeholder: "—" }}
        />
      ),
    },
  ];

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Typography as="h2" variant="t" weight="semibold">
            Pengukuran Pohon
          </Typography>
          <Typography as="p" variant="bs" className="mt-1 text-ink-2">
            Contoh kolom pengukuran; belum menjadi skema pencatatan final.
          </Typography>
        </div>
        <Button variant="secondary" onClick={onAdd}>
          <Plus size={14} aria-hidden />
          Tambah pohon
        </Button>
      </div>
      <Table
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        caption="Contoh pengukuran pohon"
      />
    </Card>
  );
}
