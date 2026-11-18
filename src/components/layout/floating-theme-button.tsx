"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";

/** floating light/dark switch, pinned next to the chatbot launcher; used on the public pages that have no top bar */
export function FloatingThemeButton() {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      aria-label={dark ? "Use light mode" : "Use dark mode"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="fixed bottom-4 right-[76px] z-50 flex size-12 items-center justify-center rounded-full bg-surface text-ink shadow-overlay transition-transform duration-150 active:scale-[0.96]"
    >
      {dark ? <Sun size={20} aria-hidden /> : <Moon size={20} aria-hidden />}
    </button>
  );
}
