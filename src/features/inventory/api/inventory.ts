import { ZONES } from "../../peta-plot/constants/zones.ts";
import { METHOD } from "../constants/method.ts";
import { PLOTS as PLOT_ROWS } from "../constants/plots.ts";
import { SPECIES as SPECIES_ROWS } from "../constants/species.ts";
import { TREES as TREE_ROWS } from "../constants/trees.ts";
import type { Plot, PlotStats, SedimentCore, Tree, TreeCarbon } from "../types/inventory.ts";

export function treeCarbon(tree: Pick<Tree, "dbh" | "rho">): TreeCarbon {
  const { agb: a, bgb: b, carbonFraction, co2PerC } = METHOD;
  const agb = a.a * tree.rho * tree.dbh ** a.dbhExp;
  const bgb = b.a * tree.rho ** b.rhoExp * tree.dbh ** b.dbhExp;
  const agc = agb * carbonFraction.agb;
  const bgc = bgb * carbonFraction.bgb;
  return { agb, bgb, agc, bgc, carbon: agc + bgc, co2e: (agc + bgc) * co2PerC };
}

export const PLOTS: Plot[] = PLOT_ROWS.map(([label, zones]) => ({ key: label, label, zones, area: null, surveyDate: null, team: null, center: null, cores: [], trees: [] }));
for (const [plot, tag, species, dbh, qc, note] of TREE_ROWS) {
  const [name, , group, rho] = SPECIES_ROWS[species];
  PLOTS[plot].trees.push({ id: `${PLOTS[plot].key}-${tag}`, tag, species: name, group, rho, dbh, height: null, qc, note });
}

// the workbook counts only identified species
const UNIDENTIFIED = "Tidak teridentifikasi";

export const plotByKey = (key: string) => PLOTS.find((plot) => plot.key === key);
export const plotForZone = (zone: string) => PLOTS.find((plot) => plot.zones.includes(zone));

const sum = (trees: Tree[], pick: (c: TreeCarbon) => number) => trees.reduce((total, tree) => total + pick(treeCarbon(tree)), 0);

// %C = %LOI / 1,724 (Van Bemmelen); 1 g C/cm2 = 100 Mg C/ha. shortcut: conversion factor taken from the earlier mock-up text, not an approved SOC method (Q-04/Q-05).
export function soilCore(core: SedimentCore) {
  const bulkDensity = core.dryMass / core.volume;
  const carbonPercent = core.loi / 1.724;
  return { bulkDensity, carbonPercent, soc: bulkDensity * (carbonPercent / 100) * core.thickness * 100 };
}

export const SPECIES_LIST = SPECIES_ROWS.map(([name, , group, rho]) => ({ name, group, rho }));

export const statsOf = (plot: Plot): PlotStats => {
  const counts = new Map<string, number>();
  for (const tree of plot.trees) counts.set(tree.species, (counts.get(tree.species) ?? 0) + 1);
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  const tonnes = (pick: (c: TreeCarbon) => number) => sum(plot.trees, pick) / 1000;
  const carbonPerHa = plot.area ? tonnes((c) => c.carbon) / plot.area : null;
  const soc = plot.cores.length ? plot.cores.reduce((total, core) => total + soilCore(core).soc, 0) : null;
  return {
    plot,
    treeCount: plot.trees.length,
    speciesCount: [...counts.keys()].filter((name) => name !== UNIDENTIFIED).length,
    meanDbh: plot.trees.length ? plot.trees.reduce((total, tree) => total + tree.dbh, 0) / plot.trees.length : null,
    dominant: top ? { name: top[0], count: top[1] } : null,
    agb: tonnes((c) => c.agb),
    bgb: tonnes((c) => c.bgb),
    agc: tonnes((c) => c.agc),
    bgc: tonnes((c) => c.bgc),
    carbon: tonnes((c) => c.carbon),
    co2e: tonnes((c) => c.co2e),
    area: plot.area,
    carbonPerHa,
    soc,
    ecosystemPerHa: carbonPerHa !== null && soc !== null ? carbonPerHa + soc : null,
  };
};

export const PLOT_STATS: PlotStats[] = PLOTS.map(statsOf);
export const statsByKey = (key: string) => PLOT_STATS.find((stats) => stats.plot.key === key);

/** all plots together, same shape as one plot */
export const TOTAL_STATS: PlotStats = statsOf({ key: "all", label: "Semua plot", zones: [], area: null, surveyDate: null, team: null, center: null, cores: [], trees: PLOTS.flatMap((plot) => plot.trees) });

/** mean of the corner points of the plot's map zones; null when the workbook name matches no zone */
export function plotCenter(plot: Plot): [number, number] | null {
  if (plot.center) return plot.center;
  const corners = ZONES.filter((zone) => plot.zones.includes(zone.name)).flatMap((zone) => zone.corners);
  if (!corners.length) return null;
  return [corners.reduce((t, c) => t + c[0], 0) / corners.length, corners.reduce((t, c) => t + c[1], 0) / corners.length];
}
