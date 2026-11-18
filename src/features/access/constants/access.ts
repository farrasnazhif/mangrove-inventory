import type { Role } from "../types/access";

// shortcut: dummy frontend RBAC, the role lives in this browser only and nothing here is a real authorization check; replace with server-side roles and RLS (FR-01, Q-02/Q-03).
// Visitors get the landing page and the full-screen map; every dashboard page is manager-only.
const PUBLIC_ROUTES = ["/peta-plot", "/login", "/sandbox"];

export const canAccess = (role: Role, pathname: string) =>
  role === "manager" || pathname === "/" || PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

export const ROLE_LABELS: Record<Role, string> = { visitor: "Pengunjung", manager: "Manager" };

// shortcut: one hard-coded demo account checked in the browser, replace with real sign-in (FR-01).
export const DEMO_MANAGER = { email: "manager@mangrove.id", password: "manager123", name: "Manager Demo" };

/** after login go back to the page the visitor came from, but only inside this app */
export const safeNext = (next: string | undefined) =>
  next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/login") ? next : "/ringkasan";
