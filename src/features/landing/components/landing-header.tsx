"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Typography } from "@/components/ui/typography";
import { useRole } from "@/features/access/components/role-provider";

export function LandingHeader() {
  const { isManager } = useRole();
  return (
    <header className="flex h-14 items-center justify-between gap-3">
      <Typography as="span" variant="bm" weight="semibold">Mangrove Inventory</Typography>
      <div className="flex items-center gap-1">
        {/* only a signed-in manager sees this; visitors are never pointed at the login page */}
        {isManager && (
          <Button size="sm" variant="secondary" nativeButton={false} role="link" render={<Link href="/ringkasan" />}>
            Buka dashboard
          </Button>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
