"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { PLOTS, SPECIES_LIST, statsOf } from "../api/inventory.ts";
import type { Plot, PlotStats, SedimentCore, Tree } from "../types/inventory.ts";

type TreeInput = { id?: string; species: string; dbh: number; height: number | null; rho: number | null; qc: Tree["qc"] };
type PlotInput = Pick<Plot, "label" | "area" | "zones" | "surveyDate" | "team" | "center">;

type PlotSelection = {
  /** the selected plot */
  stats: PlotStats;
  /** every plot, including the ones added in this session */
  all: PlotStats[];
  total: PlotStats;
  select: (key: string) => void;
  addPlot: (input: PlotInput) => void;
  saveTree: (input: TreeInput) => void;
  deleteTree: (id: string) => void;
  saveCore: (core: Omit<SedimentCore, "id"> & { id?: string }) => void;
  deleteCore: (id: string) => void;
};

const PlotContext = createContext<PlotSelection | null>(null);

// shortcut: all edits live in memory and reset on reload, replace with the data layer when persistence is approved (Q-05/Q-10).
export function PlotProvider({ children }: { children: ReactNode }) {
  const [plots, setPlots] = useState<Plot[]>(PLOTS);
  const [key, setKey] = useState(PLOTS.find((plot) => plot.trees.length)?.key ?? PLOTS[0].key);

  const value = useMemo<PlotSelection>(() => {
    const all = plots.map(statsOf);
    const total = statsOf({ key: "all", label: "Semua plot", zones: [], area: null, surveyDate: null, team: null, center: null, cores: [], trees: plots.flatMap((plot) => plot.trees) });
    const edit = (change: (plot: Plot) => Plot) => setPlots((current) => current.map((plot) => (plot.key === key ? change(plot) : plot)));
    return {
      stats: all.find((item) => item.plot.key === key) ?? all[0],
      all,
      total,
      select: setKey,
      addPlot: (input) => {
        setPlots((current) => [...current, { ...input, key: input.label, trees: [], cores: [] }]);
        setKey(input.label);
      },
      saveTree: ({ id, species, dbh, height, rho, qc }) =>
        edit((plot) => {
          const info = SPECIES_LIST.find((item) => item.name === species);
          if (!info) return plot;
          // blank rho falls back to the species value
          const base = { species, group: info.group, rho: rho ?? info.rho, dbh, height, qc };
          const trees: Tree[] = id
            ? plot.trees.map((tree) => (tree.id === id ? { ...tree, ...base } : tree))
            : [...plot.trees, { ...base, id: `${plot.key}-${plot.trees.reduce((max, tree) => Math.max(max, tree.tag), 0) + 1}`, tag: plot.trees.reduce((max, tree) => Math.max(max, tree.tag), 0) + 1 }];
          return { ...plot, trees };
        }),
      deleteTree: (id) => edit((plot) => ({ ...plot, trees: plot.trees.filter((tree) => tree.id !== id) })),
      saveCore: ({ id, ...fields }) =>
        edit((plot) => ({
          ...plot,
          cores: id
            ? plot.cores.map((core) => (core.id === id ? { id, ...fields } : core))
            : [...plot.cores, { id: crypto.randomUUID(), ...fields }],
        })),
      deleteCore: (id) => edit((plot) => ({ ...plot, cores: plot.cores.filter((core) => core.id !== id) })),
    };
  }, [plots, key]);

  return <PlotContext.Provider value={value}>{children}</PlotContext.Provider>;
}

export function usePlotSelection() {
  const value = useContext(PlotContext);
  if (!value) throw new Error("usePlotSelection must be used inside PlotProvider");
  return value;
}
