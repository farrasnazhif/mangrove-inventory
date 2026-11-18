"use client";

import { useState } from "react";
import { Notice } from "@/components/ui/notice";
import { Typography } from "@/components/ui/typography";
import {
  INITIAL_SEDIMENT_LAYERS,
  INITIAL_TREES,
  PLOT_CONTEXT,
} from "../constants/data-lapangan-data";
import type {
  SedimentLayerRecord,
  TreeRecord,
} from "../types/data-lapangan";
import { PlotContext } from "./plot-context";
import { SedimentLayers } from "./sediment-layers";
import { TreeMeasurements } from "./tree-measurements";

export function DataLapanganOverview() {
  const [trees, setTrees] = useState(INITIAL_TREES);
  const [layers, setLayers] = useState(INITIAL_SEDIMENT_LAYERS);

  function addTree() {
    setTrees((current) => [
      ...current,
      {
        id: `tree-${current.length + 1}`,
        code: `Pohon contoh ${String(current.length + 1).padStart(2, "0")}`,
        species: null,
        dbh: null,
        height: null,
      } satisfies TreeRecord,
    ]);
  }

  function addLayer() {
    setLayers((current) => [
      ...current,
      {
        id: `layer-${current.length + 1}`,
        label: `Lapisan contoh ${String(current.length + 1).padStart(2, "0")}`,
        depthStart: null,
        depthEnd: null,
        dryMass: null,
        coreVolume: null,
        loi: null,
      } satisfies SedimentLayerRecord,
    ]);
  }

  function updateTree(
    id: string,
    updates: Partial<Pick<TreeRecord, "species" | "dbh" | "height">>,
  ) {
    setTrees((current) =>
      current.map((tree) => (tree.id === id ? { ...tree, ...updates } : tree)),
    );
  }

  function updateLayer(
    id: string,
    updates: Partial<
      Pick<
        SedimentLayerRecord,
        "depthStart" | "depthEnd" | "dryMass" | "coreVolume" | "loi"
      >
    >,
  ) {
    setLayers((current) =>
      current.map((layer) => (layer.id === id ? { ...layer, ...updates } : layer)),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <Typography as="h1" variant="h5" weight="semibold">
          Data Lapangan
        </Typography>
        <Typography as="p" variant="bs" className="mt-1 text-ink-2">
          Informasi plot, pengukuran pohon, dan sampel sedimen.
        </Typography>
      </header>
      <Notice tone="info">
        <Typography as="span" variant="bs">
          Tampilan demo. Data contoh tidak tersimpan dan bukan hasil pengukuran lapangan.
        </Typography>
      </Notice>
      <PlotContext plot={PLOT_CONTEXT} />
      <TreeMeasurements rows={trees} onAdd={addTree} onChange={updateTree} />
      <SedimentLayers rows={layers} onAdd={addLayer} onChange={updateLayer} />
    </div>
  );
}
