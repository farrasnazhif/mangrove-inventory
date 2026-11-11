"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Folder, FlaskConical, Layers, Map, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import SidebarNav from "@/components/ui/sidebar-nav";

const PRODUCT_NAV = [
  { key: "/ringkasan", label: "Ringkasan", icon: <Layers size={18} /> },
  { key: "/data-lapangan", label: "Data Lapangan", icon: <Folder size={18} /> },
  {
    key: "/perhitungan-karbon",
    label: "Perhitungan Karbon",
    icon: <Layers size={18} />,
  },
  {
    key: "/bulk-density-soc",
    label: "Bulk density & SOC",
    icon: <FlaskConical size={18} />,
  },
  { key: "/peta-plot", label: "Peta Plot", icon: <Map size={18} /> },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function go(href: string) {
    setMenuOpen(false);
    router.push(href);
  }

  const sidebar = (
    <SidebarNav
      fill
      className="py-4"
      header={
        <Link href="/ringkasan" className="truncate">
          Mangrove inventory
        </Link>
      }
      newChatLabel={null}
      navItems={PRODUCT_NAV}
      activeNav={PRODUCT_NAV.find((i) => pathname.startsWith(i.key))?.key ?? ""}
      onNavigate={go}
      listLabel={null}
      footerLabel={null}
    />
  );

  return (
    <div className="min-h-dvh lg:flex">
      <div className="sticky top-0 hidden h-dvh shrink-0 self-start border-r border-line bg-canvas lg:block">
        {sidebar}
      </div>
      <main id="main-content" className="min-w-0 flex-1">
        <header className="flex h-14 items-center justify-between gap-3 border-b border-line px-6 lg:justify-end lg:px-10">
          <div className="lg:hidden">
            <Dialog
              title="Navigation"
              description="Choose a page."
              open={menuOpen}
              onOpenChange={setMenuOpen}
              trigger={
                <Button size="sm" variant="ghost" aria-label="Open navigation">
                  <Menu size={16} />
                </Button>
              }
            >
              <div className="h-[min(65dvh,640px)]">{sidebar}</div>
            </Dialog>
          </div>
          {/* inert for now: notifications are a P1 requirement (FR-04) */}
          <Button size="sm" variant="ghost" aria-label="Notifications">
            <Bell size={16} />
          </Button>
        </header>
        <div className="mx-auto max-w-7xl px-6 py-9 lg:px-10 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
