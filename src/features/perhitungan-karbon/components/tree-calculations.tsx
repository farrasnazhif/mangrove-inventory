import { Card } from "@/components/ui/card";
import { Table, type TableColumn } from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import type { CarbonTreeRow } from "../types/perhitungan-karbon";

const COLUMNS: TableColumn<CarbonTreeRow>[] = [
  { id: "tree", label: "Pohon", value: (row) => row.tree },
  { id: "agb", label: "AGB", value: (row) => row.agb },
  { id: "agc", label: "AGC", value: (row) => row.agc },
  { id: "bgb", label: "BGB", value: (row) => row.bgb },
  { id: "bgc", label: "BGC", value: (row) => row.bgc },
];

export function TreeCalculations({ rows }: { rows: CarbonTreeRow[] }) {
  return (
    <Card className="flex flex-col gap-4">
      <div>
        <Typography as="h2" variant="t" weight="semibold">
          Rincian per Pohon
        </Typography>
        <Typography as="p" variant="bs" className="mt-1 text-ink-2">
          Biomassa dan karbon ditampilkan terpisah; hasil belum dihitung.
        </Typography>
      </div>
      <Table
        rows={rows}
        columns={COLUMNS}
        getRowId={(row) => row.id}
        caption="Rincian ilustratif per pohon"
      />
    </Card>
  );
}
