"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/features/inventory/api/format";
import { SPECIES_LIST, soilCore } from "@/features/inventory/api/inventory";
import { usePlotSelection } from "@/features/inventory/components/plot-provider";
import { RecordFormDialog, type FormField } from "@/features/inventory/components/record-form-dialog";
import type { SedimentCore, Tree } from "@/features/inventory/types/inventory";
import { PlotContext } from "./plot-context";
import { PlotHeader } from "./plot-header";
import { RecordSection } from "./record-section";

const QC_LABEL = { 0: "OK", 1: "Diperbaiki", 2: "Perlu verifikasi" } as const;
const QC_TONE = { 0: "success", 1: "neutral", 2: "warning" } as const;

const TREE_FIELDS: FormField[] = [
  { name: "species", kind: "select", label: "Jenis mangrove", required: true, options: SPECIES_LIST.map(({ name }) => ({ value: name, label: name })) },
  { name: "dbh", kind: "number", label: "DBH (cm)", required: true, min: 1, max: 300 },
  { name: "height", kind: "number", label: "Tinggi (m)", min: 0.1, max: 80 },
  { name: "rho", kind: "number", label: "ρ kayu (g/cm³), kosongkan untuk nilai jenis", min: 0.1, max: 1.5 },
  { name: "qc", kind: "select", label: "Status QC", required: true, options: [{ value: "0", label: "OK" }, { value: "1", label: "Diperbaiki" }, { value: "2", label: "Perlu verifikasi" }] },
];

const CORE_FIELDS: FormField[] = [
  { name: "depth", kind: "number", label: "Kedalaman (cm)", required: true, min: 0 },
  { name: "thickness", kind: "number", label: "Tebal lapisan (cm)", required: true, min: 0.1 },
  { name: "dryMass", kind: "number", label: "Massa kering (g)", required: true, min: 0.01 },
  { name: "volume", kind: "number", label: "Volume inti (cm³)", required: true, min: 0.01 },
  { name: "loi", kind: "number", label: "LOI (%)", required: true, min: 0, max: 100 },
];

type Dialog = { kind: "tree"; row?: Tree } | { kind: "core"; row?: SedimentCore };
type Removal = { kind: "tree" | "core"; id: string; label: string };

export function DataLapanganOverview() {
  const { stats, saveTree, deleteTree, saveCore, deleteCore } = usePlotSelection();
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const [removal, setRemoval] = useState<Removal | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const open = (next: Dialog) => {
    setDialog(next);
    setFormOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <PlotHeader />
      <PlotContext />
      {/* key resets the page and filter when another plot is chosen */}
      <RecordSection<Tree>
        key={stats.plot.key}
        title="Data Tegakan Mangrove"
        addLabel="Tambah Pohon"
        caption={`Data tegakan mangrove ${stats.plot.label}`}
        filename={`tegakan-${stats.plot.label}.csv`}
        rows={stats.plot.trees}
        empty="Data pohon tidak tersedia untuk plot ini."
        onAdd={() => open({ kind: "tree" })}
        onEdit={(row) => open({ kind: "tree", row })}
        onDelete={(row) => setRemoval({ kind: "tree", id: row.id, label: `pohon No. Tag ${row.tag}` })}
        columns={[
          { id: "tag", label: "No. Tag", get: (row) => String(row.tag) },
          { id: "species", label: "Jenis mangrove", get: (row) => row.species },
          { id: "dbh", label: "DBH (cm)", get: (row) => formatNumber(row.dbh) },
          { id: "height", label: "Tinggi (m)", get: (row) => (row.height === null ? null : formatNumber(row.height)) },
          { id: "rho", label: "ρ kayu (g/cm³)", get: (row) => formatNumber(row.rho, 3) },
          {
            id: "qc",
            label: "Status QC",
            get: (row) => QC_LABEL[row.qc],
            render: (row) => <Badge tone={QC_TONE[row.qc]}>{QC_LABEL[row.qc]}</Badge>,
          },
        ]}
      />
      <RecordSection<SedimentCore>
        key={`${stats.plot.key}-sediment`}
        title="Data Inti Sedimen"
        addLabel="Tambah Sampel"
        caption="Data inti sedimen"
        filename={`sedimen-${stats.plot.label}.csv`}
        rows={stats.plot.cores}
        empty="Data inti sedimen tidak tersedia."
        onAdd={() => open({ kind: "core" })}
        onEdit={(row) => open({ kind: "core", row })}
        onDelete={(row) => setRemoval({ kind: "core", id: row.id, label: `lapisan kedalaman ${row.depth} cm` })}
        columns={[
          { id: "depth", label: "Kedalaman (cm)", get: (row) => formatNumber(row.depth) },
          { id: "thickness", label: "Tebal (cm)", get: (row) => formatNumber(row.thickness) },
          { id: "dry", label: "Massa Kering (g)", get: (row) => formatNumber(row.dryMass, 2) },
          { id: "volume", label: "Volume (cm3)", get: (row) => formatNumber(row.volume, 2) },
          { id: "loi", label: "%LOI", get: (row) => formatNumber(row.loi) },
          { id: "pb", label: "PB (g/cm3)", get: (row) => formatNumber(soilCore(row).bulkDensity, 3) },
          { id: "soc", label: "SOC (Mg C/ha)", get: (row) => formatNumber(soilCore(row).soc, 2) },
        ]}
      />

      <RecordFormDialog
        // the form body remounts per record so its fields start from that record
        key={`${dialog?.kind}-${dialog?.row?.id ?? "new"}`}
        open={formOpen && dialog?.kind === "tree"}
        onOpenChange={setFormOpen}
        title={dialog?.row ? "Ubah Pohon" : "Tambah Pohon"}
        description={`Plot ${stats.plot.label}. Tinggi hanya dicatat; persamaan Komiyama memakai DBH dan ρ.`}
        fields={TREE_FIELDS}
        initial={dialog?.kind === "tree" && dialog.row ? { species: dialog.row.species, dbh: dialog.row.dbh, height: dialog.row.height, rho: dialog.row.rho, qc: String(dialog.row.qc) } : { qc: "0" }}
        onSubmit={(values) => saveTree({ id: dialog?.row?.id, species: String(values.species), dbh: Number(values.dbh), height: typeof values.height === "number" ? values.height : null, rho: typeof values.rho === "number" ? values.rho : null, qc: Number(values.qc) as Tree["qc"] })}
      />
      <RecordFormDialog
        key={`core-${dialog?.kind}-${dialog?.row?.id ?? "new"}`}
        open={formOpen && dialog?.kind === "core"}
        onOpenChange={setFormOpen}
        title={dialog?.row ? "Ubah Lapisan Sedimen" : "Tambah Lapisan Sedimen"}
        description={`Plot ${stats.plot.label}. PB, %C dan SOC dihitung otomatis dari isian ini.`}
        fields={CORE_FIELDS}
        initial={dialog?.kind === "core" && dialog.row ? { depth: dialog.row.depth, thickness: dialog.row.thickness, dryMass: dialog.row.dryMass, volume: dialog.row.volume, loi: dialog.row.loi } : {}}
        onSubmit={(values) =>
          saveCore({ id: dialog?.row?.id, depth: Number(values.depth), thickness: Number(values.thickness), dryMass: Number(values.dryMass), volume: Number(values.volume), loi: Number(values.loi) })
        }
      />
      <AlertDialog
        open={removal !== null}
        onOpenChange={(next) => !next && setRemoval(null)}
        title="Hapus data?"
        description={`Hapus ${removal?.label ?? ""} dari plot ${stats.plot.label}? Perubahan hanya berlaku selama halaman terbuka.`}
      >
        <Button
          variant="danger"
          onClick={() => {
            if (removal) (removal.kind === "tree" ? deleteTree : deleteCore)(removal.id);
            setRemoval(null);
          }}
        >
          Hapus
        </Button>
      </AlertDialog>
    </div>
  );
}
