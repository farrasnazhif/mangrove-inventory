export type Theme = "light" | "dark";

export function getTheme(value: string | undefined): Theme {
  return value === "dark" ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  const swap = () => {
    document.documentElement.dataset.theme = theme;
  };
  // Cross-fade the whole page in one pass instead of transitioning every element;
  // shortcut: unsupported browsers (and reduced motion) swap instantly, upgrade never needed.
  if (
    "startViewTransition" in document &&
    !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  ) {
    document.startViewTransition(swap);
  } else {
    swap();
  }
  document.cookie = `theme=${theme}; Path=/; Max-Age=31536000; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
}
