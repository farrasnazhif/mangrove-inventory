import { AppShell } from "@/components/layout/app-shell";
import { RoleProvider } from "@/features/access/components/role-provider";
import { RouteGuard } from "@/features/access/components/route-guard";
import { PlotProvider } from "@/features/inventory/components/plot-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleProvider>
      <RouteGuard>
        <PlotProvider>
          <AppShell>{children}</AppShell>
        </PlotProvider>
      </RouteGuard>
    </RoleProvider>
  );
}
