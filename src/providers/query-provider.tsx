"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { ApiError } from "@/lib/axios";

// Retry once, and only when the server may recover (no response or 5xx).
// A 4xx answer is final: retrying cannot fix it.
function retryOnce(failureCount: number, error: Error) {
  const final = error instanceof ApiError && error.status >= 400 && error.status < 500;
  return !final && failureCount < 1;
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 30000, retry: retryOnce },
          mutations: { retry: false },
        },
      }),
  );
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
