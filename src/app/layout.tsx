import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getTheme } from "@/lib/theme";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Mangrove Inventory",
    template: "%s · Mangrove Inventory",
  },
  description:
    "Frontend for the Mangrove Carbon Stock Inventory.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = getTheme((await cookies()).get("theme")?.value);
  return (
    <html lang="en" data-theme={theme}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider initialTheme={theme}>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
