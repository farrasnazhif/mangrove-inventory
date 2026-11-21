"use client";

import { AppShell } from "@/components/layout/app-shell";
import { FloatingThemeButton } from "@/components/layout/floating-theme-button";
import { ChatbotWidget } from "@/features/chatbot/components/chatbot-widget";
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
    <>
      <PetaPlotOverview fullScreen />
      {/* the visitor map has no top bar, so the theme switch and the public chatbot float over it */}
      <FloatingThemeButton />
      <ChatbotWidget />
    </>
  );
}

/** /peta-vak is public, so it sits outside the dashboard layout and picks its own frame by role */
export function PetaPlotScreen() {
  return (
    <RoleProvider>
      <PlotProvider>
        <Screen />
      </PlotProvider>
    </RoleProvider>
  );
}
