import assert from "node:assert/strict";
import { test } from "node:test";
import { AxiosError, type AxiosAdapter, type InternalAxiosRequestConfig } from "axios";
import { ApiError, http } from "../src/lib/axios.ts";

// Fake the network: answer every request with the given status and body.
function reply(status: number, data: unknown): AxiosAdapter {
  return async (config: InternalAxiosRequestConfig) => {
    const response = { data, status, statusText: "", headers: {}, config };
    if (status < 400) return response;
    throw new AxiosError("failed", "ERR_BAD_RESPONSE", config, null, response);
  };
}

async function failure(adapter: AxiosAdapter) {
  try {
    await http.get("/x", { adapter });
  } catch (error) {
    assert.ok(error instanceof ApiError, "every failure must be an ApiError");
    return error;
  }
  throw new Error("request should have failed");
}

test("successful responses return their data", async () => {
  const res = await http.get("/x", { adapter: reply(200, { status: "ok" }) });
  assert.deepEqual(res.data, { status: "ok" });
});

test("the backend's standard error body becomes an ApiError", async () => {
  const error = await failure(
    reply(422, {
      code: "validation_error",
      message: "Request validation failed",
      details: [{ in: "query", field: "page_size", message: "too big" }],
      request_id: "abc123",
    }),
  );
  assert.equal(error.status, 422);
  assert.equal(error.code, "validation_error");
  assert.equal(error.requestId, "abc123");
  assert.deepEqual(error.details, [{ in: "query", field: "page_size", message: "too big" }]);
});

test("a non-standard error body (for example a proxy's HTML page) still gives an ApiError", async () => {
  const error = await failure(reply(502, "<html>Bad Gateway</html>"));
  assert.deepEqual([error.status, error.code], [502, "http_error"]);
});

test("no response means status 0 with a network or timeout code", async () => {
  const none = (code: string): AxiosAdapter => async (config) => {
    throw new AxiosError("no response", code, config);
  };
  const offline = await failure(none("ERR_NETWORK"));
  assert.deepEqual([offline.status, offline.code], [0, "network_error"]);
  const slow = await failure(none("ECONNABORTED"));
  assert.deepEqual([slow.status, slow.code], [0, "timeout"]);
});
