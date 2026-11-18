import { Card } from "@/components/ui/card";
import { Table, type TableColumn } from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import type { SoilLayerRow } from "../types/bulk-density-soc";

const COLUMNS: TableColumn<SoilLayerRow>[] = [
  { id: "layer", label: "Lapisan", value: (row) => row.layer },
  { id: "depth", label: "Kedalaman (cm)", value: (row) => row.depth },
  { id: "dry-mass", label: "Massa kering", value: (row) => row.dryMass },
  { id: "core-volume", label: "Volume inti (cm³)", value: (row) => row.coreVolume },
  { id: "loi", label: "LOI (%)", value: (row) => row.loi },
  { id: "bulk-density", label: "BD (g/cm³)", value: (row) => row.bulkDensity },
  { id: "carbon-percent", label: "%C", value: (row) => row.carbonPercent },
  { id: "soc", label: "SOC (Mg C/ha)", value: (row) => row.soc },
];

export function SoilLayerProfile({ rows }: { rows: SoilLayerRow[] }) {
  return (
    <Card className="flex flex-col gap-4">
      <div>
        <Typography as="h2" variant="t" weight="semibold">
          Profil Lapisan Sedimen
        </Typography>
        <Typography as="p" variant="bs" className="mt-1 text-ink-2">
          Nilai kosong tidak diperlakukan sebagai nol.
        </Typography>
      </div>
      <Table
        rows={rows}
        columns={COLUMNS}
        getRowId={(row) => row.id}
        caption="Profil bulk density dan SOC ilustratif"
      />
    </Card>
  );
}
