import axios, { isAxiosError } from "axios";
import { z } from "zod";

// Backend base URL, including the version prefix. Set NEXT_PUBLIC_API_URL for other environments.
const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

// The backend's standard error body: {code, message, details, request_id}.
const errorBody = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
  request_id: z.string().optional(),
});

export class ApiError extends Error {
  /** HTTP status, or 0 when no response arrived (network error, timeout). */
  readonly status: number;
  readonly code: string;
  readonly details: unknown;
  readonly requestId: string;

  constructor(status: number, code: string, message: string, details: unknown = null, requestId = "") {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
    this.requestId = requestId;
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (isAxiosError(error)) {
    if (!error.response) {
      const timeout = error.code === "ECONNABORTED";
      return new ApiError(
        0,
        timeout ? "timeout" : "network_error",
        timeout ? "The server took too long to respond." : "Cannot reach the server.",
      );
    }
    const { status, data } = error.response;
    const body = errorBody.safeParse(data);
    if (body.success) {
      const { code, message, details, request_id } = body.data;
      return new ApiError(status, code, message, details, request_id);
    }
    return new ApiError(status, "http_error", `Request failed with status ${status}.`);
  }
  return new ApiError(0, "unknown_error", error instanceof Error ? error.message : "Unexpected error.");
}

/** Shared client: every failure is thrown as an ApiError, so callers handle one error type. */
export const http = axios.create({ baseURL, timeout: 15000 });
http.interceptors.response.use(undefined, (error: unknown) => Promise.reject(toApiError(error)));
