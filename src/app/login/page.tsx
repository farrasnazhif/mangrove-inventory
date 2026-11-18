import type { Metadata } from "next";
import { LoginOverview } from "@/features/access/components/login-overview";

export const metadata: Metadata = { title: "Masuk" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  return <LoginOverview next={(await searchParams).next} />;
}
