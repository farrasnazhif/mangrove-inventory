"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRole } from "@/features/access/components/role-provider";

const LINKS = [
  { href: "#cara-kerja", label: "Cara kerja" },
  { href: "#angka", label: "Hasil ukur" },
  { href: "#penghuni", label: "Jenis mangrove" },
];

export function LandingHeader() {
  const { isManager } = useRole();
  return (
    <header className="l-nav">
      <div className="l-container flex items-center justify-between gap-4">
        <Link
          href="/"
          className="l-serif text-[22px] font-semibold text-[var(--l-head)]"
        >
          MangroLens
        </Link>
        {/* the nav and the manager button share the right side, so the logo and the nav sit at opposite ends */}
        <div className="flex items-center gap-8">
          <nav
            aria-label="Navigasi utama"
            className="hidden items-center gap-8 md:flex"
          >
            {LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <Link href="/peta-vak">Peta Vak</Link>
          </nav>
          {/* only a signed-in manager sees this; visitors are never pointed at the login page */}
          {isManager && (
            <Button
              size="sm"
              variant="secondary"
              nativeButton={false}
              role="link"
              render={<Link href="/ringkasan" />}
              className="hidden sm:inline-flex"
            >
              Dashboard
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
