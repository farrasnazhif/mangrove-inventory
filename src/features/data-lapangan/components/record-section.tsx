import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, type TableColumn } from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";

const dash = (value: string | null) => value ?? "—";

// shortcut: Export/Filter/Tambah/edit/delete are visual only, wire them when the field schema is approved.
export function RecordSection<T extends { id: string }>({ title, addLabel, columns, rows, caption }: {
  title: string;
  addLabel: string;
  columns: { id: string; label: string; get: (row: T) => string | null }[];
  rows: T[];
  caption: string;
}) {
  const tableColumns: TableColumn<T>[] = [
    ...columns.map((column) => ({ id: column.id, label: column.label, value: (row: T) => dash(column.get(row)) })),
    { id: "doc", label: "Dokumentasi", value: () => "Lihat Detail" },
    {
      id: "actions",
      label: "Aksi",
      value: () => "",
      render: (row) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" aria-label={`Ubah ${row.id}`}><Pencil size={14} aria-hidden /></Button>
          <Button variant="danger" size="sm" aria-label={`Hapus ${row.id}`}><Trash2 size={14} aria-hidden /></Button>
        </div>
      ),
    },
  ];

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Typography as="h2" variant="t" weight="semibold">{title}</Typography>
        <div className="flex gap-2">
          <Button variant="secondary">Export</Button>
          <Button variant="secondary">Filter</Button>
          <Button variant="primary">{addLabel}</Button>
        </div>
      </div>
      <Table rows={rows} columns={tableColumns} getRowId={(row) => row.id} caption={caption} />
    </Card>
  );
}
