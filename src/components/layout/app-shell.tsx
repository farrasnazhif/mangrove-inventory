"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ChevronsUpDown,
  Folder,
  FlaskConical,
  Layers,
  LogOut,
  Map,
  Menu,
  User,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import SidebarNav from "@/components/ui/sidebar-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const DUMMY_USER = { name: "Dummy User", email: "user@example.com" };

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
      footer={
        <DropdownMenu
          trigger={
            <button
              type="button"
              className="flex h-10 w-full items-center gap-2 rounded-control px-2 text-left transition-[background-color,transform] duration-150 hover:bg-hover-2 active:scale-[0.98]"
            >
              <Avatar name={DUMMY_USER.name} size="sm" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-ink">
                  {DUMMY_USER.name}
                </span>
                <span className="block truncate text-[11.5px] text-ink-3">
                  {DUMMY_USER.email}
                </span>
              </span>
              <ChevronsUpDown size={14} className="shrink-0 text-ink-3" />
            </button>
          }
          items={[
            // inert for now: dummy user, no profile page or auth yet
            {
              id: "profile",
              label: "Profile",
              icon: <User size={14} />,
              onSelect: () => {},
            },
            {
              id: "sign-out",
              label: "Sign out",
              icon: <LogOut size={14} />,
              danger: true,
              onSelect: () => {},
            },
          ]}
        />
      }
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
          <div className="flex items-center gap-1">
            <ThemeToggle />
            {/* inert for now: notifications are a P1 requirement (FR-04) */}
            <Button size="sm" variant="quiet" aria-label="Notifications">
              <Bell size={16} />
            </Button>
          </div>
        </header>
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
