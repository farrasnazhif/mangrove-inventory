import assert from "node:assert/strict";
import test from "node:test";
import { dummyAnswer } from "../src/features/chatbot/api/dummy-answer.ts";
import { PLOT_STATS } from "../src/features/inventory/api/inventory.ts";

test("manager gets the per-plot carbon breakdown from the workbook data", () => {
  const answer = dummyAnswer("manager", "Berapa total stok karbon Vak 1?", PLOT_STATS).text;
  assert.match(answer, /VAK 1 memiliki 306 pohon dari 3 jenis/);
  assert.match(answer, /85,7 ton C/);
  assert.match(answer, /314,2 ton CO₂e/);
  assert.match(answer, /SOC\): data tidak tersedia/);
});

test("plot names accept digits, roman numerals and the Zona alias", () => {
  assert.match(dummyAnswer("manager", "stok karbon vak 4", PLOT_STATS).text, /VAK 4/);
  assert.match(dummyAnswer("manager", "stok karbon Vak IV", PLOT_STATS).text, /VAK 4/);
  assert.match(dummyAnswer("manager", "stok karbon Vak XIII", PLOT_STATS).text, /Zona 5 MA = VAK 13/);
});

test("plots without tree data say so instead of inventing numbers", () => {
  assert.match(dummyAnswer("manager", "stok karbon Vak 6", PLOT_STATS).text, /tidak tersedia/);
  assert.match(dummyAnswer("manager", "stok karbon Vak 8", PLOT_STATS).text, /tidak tersedia/);
});

test("highest plot comes from plots that have data", () => {
  assert.match(dummyAnswer("manager", "Vak mana yang tertinggi?", PLOT_STATS).text, /VAK 10 Lorong Casuarina sebesar 620,1 ton C/);
});

test("visitor never receives plot-level numbers", () => {
  assert.match(dummyAnswer("visitor", "Berapa total stok karbon Vak 1?", PLOT_STATS).text, /belum dipublikasikan/);
  assert.match(dummyAnswer("visitor", "Apa itu karbon biru?", PLOT_STATS).text, /Karbon biru/);
});

test("only inventory answers are marked as sourced", () => {
  assert.equal(dummyAnswer("manager", "stok karbon Vak 1", PLOT_STATS).sourced, true);
  assert.equal(dummyAnswer("manager", "Apa itu karbon biru?", PLOT_STATS).sourced, false);
  assert.equal(dummyAnswer("visitor", "stok karbon Vak 1", PLOT_STATS).sourced, false);
});

test("unknown questions fall back to help", () => {
  assert.match(dummyAnswer("manager", "halo", PLOT_STATS).text, /belum paham/);
});
