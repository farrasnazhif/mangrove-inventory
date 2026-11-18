import assert from "node:assert/strict";
import test from "node:test";
import { DEMO_MANAGER, canAccess, safeNext } from "../src/features/access/constants/access.ts";

test("visitors only get the landing page, the map, login and the sandbox", () => {
  for (const path of ["/", "/peta-plot", "/login", "/sandbox"]) assert.equal(canAccess("visitor", path), true, path);
});

test("every dashboard page is manager-only", () => {
  for (const path of ["/ringkasan", "/data-lapangan", "/perhitungan-karbon", "/bulk-density-soc"]) {
    assert.equal(canAccess("visitor", path), false, path);
    assert.equal(canAccess("manager", path), true, path);
  }
});

test("login redirects stay inside the app", () => {
  assert.equal(safeNext("/data-lapangan"), "/data-lapangan");
  assert.equal(safeNext(undefined), "/ringkasan");
  assert.equal(safeNext("https://evil.example"), "/ringkasan");
  assert.equal(safeNext("//evil.example"), "/ringkasan");
  assert.equal(safeNext("/login"), "/ringkasan");
  assert.ok(DEMO_MANAGER.email.includes("@"));
});
