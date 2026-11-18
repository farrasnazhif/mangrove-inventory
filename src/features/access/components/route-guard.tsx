"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { canAccess } from "../constants/access";
import { useRole } from "./role-provider";

/** dashboard pages are manager-only: a visitor is sent back to the landing page; UI only, a real app must also check the role on the server */
export function RouteGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { role, ready } = useRole();
  const allowed = canAccess(role, pathname);

  useEffect(() => {
    if (ready && !allowed) router.replace("/");
  }, [ready, allowed, router]);

  return ready && allowed ? children : null;
}
