"use client";

import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { Table, type TableColumn } from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import { TableButtons, TableFilter, useTableTools } from "@/features/inventory/components/table-tools";

// shortcut: also reused by bulk-density-soc, move to ui/ if a third feature needs it.
export function CarbonTableSection<T extends { id: string }>({ title, caption, rows, columns, footer, empty, filename }: {
  title: string;
  caption: string;
  rows: T[];
  columns: { id: string; label: string; get: (row: T) => string | null }[];
  footer?: { label: string; value: string };
  empty?: string;
  filename: string;
}) {
  const tools = useTableTools(rows, columns, filename);
  const tableColumns: TableColumn<T>[] = columns.map((column) => ({
    id: column.id,
    label: column.label,
    value: (row) => column.get(row) ?? "-",
  }));
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Typography as="h2" variant="t" weight="semibold">{title}</Typography>
        <div className="flex gap-2">
          <TableButtons tools={tools} />
        </div>
      </div>
      <TableFilter tools={tools} />
      <Table rows={tools.visible} columns={tableColumns} getRowId={(row) => row.id} caption={caption} empty={tools.query ? "Tidak ada baris yang cocok." : empty} />
      {footer && (
        <div className="flex justify-between rounded-control bg-inset px-3 py-3">
          <Typography as="span" variant="bs" className="text-ink-2">{footer.label}</Typography>
          <Typography as="span" variant="bs">{footer.value}</Typography>
        </div>
      )}
      {tools.pageCount > 1 && <Pagination page={tools.page} pageCount={tools.pageCount} onPageChange={tools.setPage} />}
    </Card>
  );
}
