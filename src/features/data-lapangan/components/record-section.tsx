"use client";

import type { ReactNode } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { Table, type TableColumn } from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import { ExportButton, TableActiveFilters, TableFilters, useTableTools } from "@/features/inventory/components/table-tools";

export function RecordSection<T extends { id: string }>({ title, addLabel, columns, rows, caption, empty, filename, onAdd, onEdit, onDelete }: {
  title: string;
  addLabel: string;
  columns: { id: string; label: string; get: (row: T) => string | null; render?: (row: T) => ReactNode }[];
  rows: T[];
  caption: string;
  empty: string;
  filename: string;
  onAdd: () => void;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
}) {
  const tools = useTableTools(rows, columns, filename);
  const tableColumns: TableColumn<T>[] = [
    ...columns.map((column) => ({ id: column.id, label: column.label, value: (row: T) => column.get(row) ?? "-", render: column.render })),
    { id: "doc", label: "Dokumentasi", value: () => "-" },
    {
      id: "actions",
      label: "Aksi",
      value: () => "",
      render: (row) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" aria-label={`Ubah ${row.id}`} onClick={() => onEdit(row)}><Pencil size={14} aria-hidden /></Button>
          <Button variant="danger" size="sm" aria-label={`Hapus ${row.id}`} onClick={() => onDelete(row)}><Trash2 size={14} aria-hidden /></Button>
        </div>
      ),
    },
  ];

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Typography as="h2" variant="t" weight="semibold">{title}</Typography>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <ExportButton tools={tools} />
          <TableFilters tools={tools} />
          <Button variant="primary" onClick={onAdd}>
            <Plus size={14} aria-hidden />
            {addLabel}
          </Button>
        </div>
      </div>
      <TableActiveFilters tools={tools} />
      <Table rows={tools.visible} columns={tableColumns} getRowId={(row) => row.id} caption={caption} empty={tools.activeCount ? "Tidak ada baris yang cocok dengan filter." : empty} />
      {tools.pageCount > 1 && <Pagination page={tools.page} pageCount={tools.pageCount} onPageChange={tools.setPage} />}
    </Card>
  );
}
