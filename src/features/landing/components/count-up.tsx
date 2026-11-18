"use client";

import { useEffect, useState } from "react";
import { formatNumber } from "@/features/inventory/api/format";

/** counts from 0 to the value once on load; jumps straight to the value when reduced motion is on */
export function CountUp({ value, digits = 0 }: { value: number; digits?: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setShown(value));
      return () => cancelAnimationFrame(frame);
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      setShown(value * (1 - (1 - t) ** 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return (
    <>
      <span aria-hidden>{formatNumber(shown, digits)}</span>
      <span className="sr-only">{formatNumber(value, digits)}</span>
    </>
  );
}
