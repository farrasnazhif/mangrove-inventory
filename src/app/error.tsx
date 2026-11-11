"use client";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="max-w-lg mx-auto px-6 py-24">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted mt-3 mb-6">
        Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
