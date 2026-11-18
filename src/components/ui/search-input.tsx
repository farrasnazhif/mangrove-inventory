"use client";

import { Search, X } from "lucide-react";
import type { ComponentProps } from "react";
import { Input } from "./input";
import { IconButton } from "./icon-button";

export function SearchInput({ label, onClear, className = "", ...props }: ComponentProps<typeof Input> & { label: string; onClear?: () => void }) {
  return <div className="relative"><Search size={14} aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-2" />
    <Input type="search" aria-label={label} className={`pl-9 ${onClear ? "pr-10" : ""} ${className}`} {...props} />
    {onClear && props.value && <IconButton label="Clear search" variant="quiet" size="sm" className="absolute right-0.5 top-0.5" disabled={props.disabled} onClick={onClear}><X size={13} /></IconButton>}
  </div>;
}
