import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main
      id="main-content"
      className="min-h-dvh flex items-center justify-center p-6"
    >
      <div className="flex gap-2">
        <Button
          variant="primary"
          nativeButton={false}
          role="link"
          render={<Link href="/sandbox" />}
        >
          Open dashboard
        </Button>
        <Button
          variant="secondary"
          nativeButton={false}
          role="link"
          render={<Link href="/sandbox" />}
        >
          Open sandbox
        </Button>
      </div>
    </main>
  );
}
