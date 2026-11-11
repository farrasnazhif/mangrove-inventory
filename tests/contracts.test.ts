import assert from "node:assert/strict";
import { test } from "node:test";
import { projectSchema } from "../src/features/projects/validations/project.ts";

test("project validation trims names and bounds all editable values", () => {
  assert.equal(
    projectSchema.parse({
      name: "  Campus  ",
      description: "",
      status: "draft",
    }).name,
    "Campus",
  );
  for (const input of [
    { name: " ", description: "", status: "draft" },
    { name: "x".repeat(101), description: "", status: "active" },
    { name: "Campus", description: "x".repeat(2001), status: "draft" },
    { name: "Campus", description: "", status: "admin" },
  ])
    assert.equal(projectSchema.safeParse(input).success, false);
  const parsed = projectSchema.parse({
    name: "x".repeat(100),
    description: "x".repeat(2000),
    status: "completed",
    user_id: "attacker",
    id: "attacker",
  });
  assert.equal("user_id" in parsed, false);
  assert.equal("id" in parsed, false);
});
