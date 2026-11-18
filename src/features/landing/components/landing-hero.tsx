import Link from "next/link";
import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export function LandingHero() {
  return (
    <section className="flex flex-col items-start gap-4 py-8 md:py-12">
      <Typography as="h1" variant="h5" weight="semibold">Stok Karbon Mangrove Pamurbaya</Typography>
      <Typography as="p" variant="bm" className="max-w-2xl text-ink-2">
        Ringkasan terbuka dari inventarisasi karbon mangrove di Surabaya Timur, dihitung dari data tagging pohon 2026.
        Data lapangan rinci hanya tersedia bagi pengelola.
      </Typography>
      <Button variant="primary" nativeButton={false} role="link" render={<Link href="/peta-plot" />}>
        <Map size={14} aria-hidden />
        Lihat Peta Plot
      </Button>
    </section>
  );
}
