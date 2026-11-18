import assert from "node:assert/strict";
import test from "node:test";
import { PLOT_STATS, TOTAL_STATS, plotForZone, soilCore, statsByKey, statsOf } from "../src/features/inventory/api/inventory.ts";

// expected values are the totals printed on the workbook sheet "Dashboard"
test("recomputed totals match the workbook dashboard", () => {
  assert.equal(TOTAL_STATS.treeCount, 5680);
  assert.equal(TOTAL_STATS.speciesCount, 36);
  assert.ok(Math.abs(TOTAL_STATS.agb - 5243.388) < 0.01);
  assert.ok(Math.abs(TOTAL_STATS.bgb - 1749.908) < 0.01);
  assert.ok(Math.abs(TOTAL_STATS.carbon - 3146.857) < 0.01);
  assert.ok(Math.abs(TOTAL_STATS.co2e - 11538.474) < 0.01);
});

test("per-plot totals match the workbook and empty plots stay empty", () => {
  const vak1 = statsByKey("VAK 1")!;
  assert.equal(vak1.treeCount, 306);
  assert.ok(Math.abs(vak1.carbon - 85.7008) < 0.001);
  assert.equal(statsByKey("VAK 6")!.treeCount, 0);
  assert.equal(statsByKey("VAK 6")!.meanDbh, null);
  assert.equal(PLOT_STATS.length, 19);
});

test("map zones link to plots only where the workbook names them", () => {
  assert.equal(plotForZone("Vak I")?.key, "VAK 1");
  assert.equal(plotForZone("Vak XIII")?.key, "Zona 5 MA = VAK 13");
  assert.equal(plotForZone("Vak X")?.key, "VAK 9 & 10");
  assert.equal(plotForZone("Vak VIII"), undefined);
});

test("sediment layers derive PB, %C and SOC, and per-hectare values need the plot area", () => {
  const layer = { id: "c1", depth: 10, thickness: 10, dryMass: 50, volume: 100, loi: 10 };
  const derived = soilCore(layer);
  assert.equal(derived.bulkDensity, 0.5);
  assert.ok(Math.abs(derived.carbonPercent - 10 / 1.724) < 1e-9);
  assert.ok(Math.abs(derived.soc - 0.5 * (10 / 1.724 / 100) * 10 * 100) < 1e-9);

  const base = PLOT_STATS[0].plot;
  assert.equal(statsOf(base).carbonPerHa, null);
  assert.equal(statsOf(base).soc, null);
  const full = statsOf({ ...base, area: 2, cores: [layer] });
  assert.ok(Math.abs(full.carbonPerHa! - statsOf(base).carbon / 2) < 1e-9);
  assert.ok(Math.abs(full.ecosystemPerHa! - (full.carbonPerHa! + derived.soc)) < 1e-9);
  assert.equal(statsOf({ ...base, area: 2 }).ecosystemPerHa, null);
});
