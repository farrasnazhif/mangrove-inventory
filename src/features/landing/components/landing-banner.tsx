"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

/** dismissible announcement strip above the nav */
export function LandingBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="l-banner">
      <div className="l-container flex items-center justify-between gap-4 py-2.5 text-[14px]">
        <p className="min-w-0 flex-1 truncate font-medium">Data tagging pohon 2026 kini terbuka untuk publik</p>
        <Link href="/peta-plot" className="hidden whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.1em] underline-offset-4 hover:underline sm:inline">
          Lihat peta →
        </Link>
        <button type="button" onClick={() => setOpen(false)} aria-label="Tutup pengumuman" className="shrink-0 rounded-full p-1 hover:bg-[var(--l-border)]">
          <X size={16} aria-hidden />
        </button>
      </div>
    </div>
  );
}
