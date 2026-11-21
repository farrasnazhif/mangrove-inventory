import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Newsreader } from "next/font/google";
import { getTheme } from "@/lib/theme";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

// display serif for the public landing page only
const newsreader = Newsreader({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], variable: "--font-newsreader" });

export const metadata: Metadata = {
  title: {
    default: "MangroLens",
    template: "%s · MangroLens",
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
    <html lang="en" data-theme={theme} className={newsreader.variable}>
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
