"use client";

import Link from "next/link";
import { RoleProvider } from "@/features/access/components/role-provider";
import { ChatbotWidget } from "@/features/chatbot/components/chatbot-widget";
import { PlotProvider } from "@/features/inventory/components/plot-provider";
import { SummaryMetrics } from "@/features/ringkasan/components/summary-metrics";
import { LandingAggregate } from "./landing-aggregate";
import { LandingHeader } from "./landing-header";
import { LandingHero } from "./landing-hero";

/** the public page: everything a visitor may see, in one scroll */
export function LandingOverview() {
  return (
    <RoleProvider>
      <PlotProvider>
        <main
          id="main-content"
          className="mx-auto flex min-h-dvh max-w-7xl flex-col gap-6 px-6 pb-16 lg:px-10"
        >
          <LandingHeader />
          <LandingHero />
          <SummaryMetrics />
          <LandingAggregate />
        </main>
        <ChatbotWidget />
      </PlotProvider>
    </RoleProvider>
  );
}
