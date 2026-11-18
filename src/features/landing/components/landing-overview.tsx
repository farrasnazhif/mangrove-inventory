"use client";

import { FloatingThemeButton } from "@/components/layout/floating-theme-button";
import { RoleProvider } from "@/features/access/components/role-provider";
import { ChatbotWidget } from "@/features/chatbot/components/chatbot-widget";
import { PlotProvider } from "@/features/inventory/components/plot-provider";
import { LandingBanner } from "./landing-banner";
import { LandingCta } from "./landing-cta";
import { LandingFooter } from "./landing-footer";
import { LandingHeader } from "./landing-header";
import { LandingHero } from "./landing-hero";
import { LandingMethod } from "./landing-method";
import { LandingNumbers } from "./landing-numbers";
import { LandingSpecies } from "./landing-species";
import { LandingTicker } from "./landing-ticker";

/** the public page: everything a visitor may see, in one scroll. Layout follows relae.co. */
export function LandingOverview() {
  return (
    <RoleProvider>
      <PlotProvider>
        <div className="landing min-h-dvh">
          {/* <LandingBanner /> */}
          <LandingHeader />
          <main id="main-content">
            <LandingHero />
            <LandingTicker />
            <LandingMethod />
            <LandingNumbers />
            <LandingSpecies />
            <LandingCta />
          </main>
          <LandingFooter />
        </div>
        <FloatingThemeButton />
        <ChatbotWidget />
      </PlotProvider>
    </RoleProvider>
  );
}
