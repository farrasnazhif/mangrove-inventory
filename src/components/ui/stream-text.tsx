"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(onChange: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
function getReducedMotion() {
  return window.matchMedia(motionQuery).matches;
}
function getServerReducedMotion() {
  return false;
}
/* ─────────────────────────────────────────────────────────
 * STREAM TEXT — reusable streaming primitive
 * Reveals characters quickly (fast, like a real token stream);
 * the leading edge resolves out of a soft blur, and the caret
 * stays solid while streaming, then blinks once the text
 * settles. Inherits typography from its context, so it drops
 * into any text surface (Selection Actions, chat, etc.).
 * ───────────────────────────────────────────────────────── */
export function StreamText({
  text,
  charsPerTick = 2,
  tickMs = 9,
  blurTail = 6,
  caret = true,
  className,
  onProgress,
  onDone,
}: {
  text: string;
  /** characters revealed per tick — higher is faster */
  charsPerTick?: number;
  /** interval between reveals, ms */
  tickMs?: number;
  /** how many trailing characters carry the soft blur edge */
  blurTail?: number;
  /** render the caret (solid while streaming, blinks once idle) */
  caret?: boolean;
  className?: string;
  /** fires each tick — useful for re-anchoring UI to reflowing text */
  onProgress?: () => void;
  /** fires once the full string is shown */
  onDone?: () => void;
}) {
  const [count, setCount] = useState(0);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerReducedMotion);
  const onProgressRef = useRef(onProgress);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onProgressRef.current = onProgress;
    onDoneRef.current = onDone;
  }, [onProgress, onDone]);
  const [previousText, setPreviousText] = useState(text);
  if (previousText !== text) {
    setPreviousText(text);
    setCount(0);
  }
  useEffect(() => {
    if (reducedMotion) {
      onProgressRef.current?.();
      onDoneRef.current?.();
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i = Math.min(i + charsPerTick, text.length);
      setCount(i);
      onProgressRef.current?.();
      if (i >= text.length) {
        clearInterval(id);
        onDoneRef.current?.();
      }
    }, tickMs);
    return () => clearInterval(id);
  }, [text, charsPerTick, tickMs, reducedMotion]);
  const streaming = !reducedMotion && count < text.length;
  const shown = reducedMotion ? text : text.slice(0, count);
  const split = streaming ? Math.max(0, shown.length - blurTail) : shown.length;

  return (
    <span className={className}>
      {shown.slice(0, split)}
      {split < shown.length && (
        <span className="stream-tail">{shown.slice(split)}</span>
      )}
      {caret && (
        <span
          aria-hidden
          className={`stream-caret${streaming ? " is-streaming" : ""}`}
        />
      )}
    </span>
  );
}
