import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, type TableColumn } from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";

// shortcut: Export and Filter are visual only, wire them when export columns are approved (Q-09).
export function CarbonTableSection<T extends { id: string }>({ title, caption, rows, columns }: {
  title: string;
  caption: string;
  rows: T[];
  columns: { id: string; label: string; get: (row: T) => string | null }[];
}) {
  const tableColumns: TableColumn<T>[] = columns.map((column) => ({
    id: column.id,
    label: column.label,
    value: (row) => column.get(row) ?? "—",
  }));
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Typography as="h2" variant="t" weight="semibold">{title}</Typography>
        <div className="flex gap-2">
          <Button variant="secondary">Export</Button>
          <Button variant="secondary">Filter</Button>
        </div>
      </div>
      <Table rows={rows} columns={tableColumns} getRowId={(row) => row.id} caption={caption} />
    </Card>
  );
}
