import { AppShell } from "@/components/layout/app-shell";
import { PlotProvider } from "@/features/inventory/components/plot-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlotProvider>
      <AppShell>{children}</AppShell>
    </PlotProvider>
  );
}
