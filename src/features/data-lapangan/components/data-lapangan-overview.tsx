import { PLOT_INFO, SEDIMENT_LAYERS, TREES } from "../constants/data-lapangan-data";
import type { SedimentLayerRecord, TreeRecord } from "../types/data-lapangan";
import { PlotContext } from "./plot-context";
import { PlotHeader } from "./plot-header";
import { RecordSection } from "./record-section";

export function DataLapanganOverview() {
  return (
    <div className="flex flex-col gap-6">
      <PlotHeader />
      <PlotContext cards={PLOT_INFO} />
      <RecordSection<TreeRecord>
        title="Data Tegakan Mangrove"
        addLabel="Tambah Pohon"
        caption="Data tegakan mangrove"
        rows={TREES}
        columns={[
          { id: "species", label: "Jenis mangrove", get: (row) => row.species ?? "Jenis belum dipilih" },
          { id: "dbh", label: "DBH (cm)", get: (row) => row.dbh },
          { id: "height", label: "Tinggi (m)", get: (row) => row.height },
          { id: "density", label: "ρ kayu", get: (row) => row.density },
        ]}
      />
      <RecordSection<SedimentLayerRecord>
        title="Data Inti Sedimen"
        addLabel="Tambah Sampel"
        caption="Data inti sedimen"
        rows={SEDIMENT_LAYERS}
        columns={[
          { id: "depth", label: "Kedalaman", get: (row) => row.depth },
          { id: "thickness", label: "Tebal (cm)", get: (row) => row.thickness },
          { id: "dry", label: "Massa Kering (g)", get: (row) => row.dryMass },
          { id: "volume", label: "Volume (cm2)", get: (row) => row.volume },
          { id: "loi", label: "%LOI", get: (row) => row.loi },
          { id: "pb", label: "PB (0/cm2)", get: (row) => row.bulkDensity },
          { id: "soc", label: "SOC (mg/ma)", get: (row) => row.soc },
        ]}
      />
    </div>
  );
}
