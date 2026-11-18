import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingCta() {
  return (
    <section className="l-cta l-section">
      <div className="l-container flex flex-col items-center text-center">
        <p className="l-eyebrow">mulai menjelajah</p>
        <h2 className="l-h2 max-w-2xl">Siap Melihat Hutan Mangrove dari Dekat?</h2>
        <p className="l-lead mt-5 max-w-xl">
          Buka peta satelit dan klik titik untuk mengenal jenis tumbuhannya. Ada pertanyaan? Tanyakan pada asisten di pojok kanan bawah.
        </p>
        <Button size="lg" variant="primary" nativeButton={false} role="link" render={<Link href="/peta-plot" />} className="mt-8">
          Buka peta plot
        </Button>
      </div>
    </section>
  );
}
