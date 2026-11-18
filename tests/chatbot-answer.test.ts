import assert from "node:assert/strict";
import test from "node:test";
import { dummyAnswer } from "../src/features/chatbot/api/dummy-answer.ts";
import { PLOTS } from "../src/features/ringkasan/constants/ringkasan-data.ts";

test("manager gets the per-plot carbon breakdown", () => {
  const answer = dummyAnswer("manager", "Berapa total stok karbon Vak IV?", PLOTS).text;
  assert.match(answer, /Plot Vak IV/);
  assert.match(answer, /182,4 Mg C\/ha/);
  assert.match(answer, /668,8 Mg CO₂e\/ha/);
  assert.match(answer, /\(46,2%\)/);
  assert.match(answer, /\(38,1%\)/);
});

test("plot codes accept digits and report plots without data", () => {
  assert.match(dummyAnswer("manager", "stok karbon vak 4", PLOTS).text, /Plot Vak IV/);
  assert.match(dummyAnswer("manager", "stok karbon Vak XIII", PLOTS).text, /belum tersedia/);
});

test("visitor never receives plot-level numbers", () => {
  assert.match(dummyAnswer("visitor", "Berapa total stok karbon Vak IV?", PLOTS).text, /belum dipublikasikan/);
  assert.match(dummyAnswer("visitor", "Apa itu karbon biru?", PLOTS).text, /Karbon biru/);
});

test("only inventory answers are marked as sourced", () => {
  assert.equal(dummyAnswer("manager", "stok karbon Vak IV", PLOTS).sourced, true);
  assert.equal(dummyAnswer("manager", "Apa itu karbon biru?", PLOTS).sourced, false);
  assert.equal(dummyAnswer("visitor", "stok karbon Vak IV", PLOTS).sourced, false);
});

test("unknown questions fall back to help", () => {
  assert.match(dummyAnswer("manager", "halo", PLOTS).text, /belum paham/);
});
