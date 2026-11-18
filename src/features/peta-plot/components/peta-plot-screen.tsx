"use client";

import { AppShell } from "@/components/layout/app-shell";
import { RoleProvider, useRole } from "@/features/access/components/role-provider";
import { PlotProvider } from "@/features/inventory/components/plot-provider";
import { PetaPlotOverview } from "./peta-plot-overview";

function Screen() {
  const { isManager, ready } = useRole();
  if (!ready) return null;
  // managers keep the dashboard around the map; visitors get the map alone
  return isManager ? (
    <AppShell>
      <PetaPlotOverview />
    </AppShell>
  ) : (
    <PetaPlotOverview fullScreen />
  );
}

/** /peta-plot is public, so it sits outside the dashboard layout and picks its own frame by role */
export function PetaPlotScreen() {
  return (
    <RoleProvider>
      <PlotProvider>
        <Screen />
      </PlotProvider>
    </RoleProvider>
  );
}
