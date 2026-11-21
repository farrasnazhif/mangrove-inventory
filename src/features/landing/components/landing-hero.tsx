import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// decorative flowing lines behind the headline, like the animated lines on relae.co's hero
function Lines() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 520"
      preserveAspectRatio="none"
      className="landing-lines pointer-events-none absolute inset-0 size-full text-white opacity-20"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M-20 ${120 + i * 70} C 240 ${20 + i * 60}, 420 ${260 + i * 40}, 640 ${150 + i * 55} S 1040 ${60 + i * 70}, 1220 ${170 + i * 50}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
}

export function LandingHero() {
  return (
    <section className="l-hero relative overflow-hidden">
      {/* <Lines /> */}
      <div className="l-container l-section relative flex flex-col items-center text-center">
        <p className="l-eyebrow">
          Data lapangan. Perhitungan ilmiah. Terbuka untuk semua.
        </p>
        <h1 className="l-h1 max-w-3xl">
          Karbon Mangrove Pamurbaya, Dihitung dari Setiap Pohon
        </h1>
        <p className="l-lead mt-6 max-w-xl">
          Kami mengukur ribuan pohon di hutan mangrove Surabaya Timur, lalu
          menghitung berapa banyak karbon yang tersimpan di dalamnya.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            variant="primary"
            nativeButton={false}
            role="link"
            render={<Link href="/peta-vak" />}
            className="bg-white text-neutral-900 hover:bg-white/90"
          >
            Jelajahi peta
          </Button>
          <Button
            size="lg"
            variant="secondary"
            nativeButton={false}
            role="link"
            render={<a href="#cara-kerja" />}
            className="border-white/40 bg-white/10 text-white hover:bg-white/20"
          >
            Lihat cara kerjanya
            {/* <ArrowRight size={14} aria-hidden /> */}
          </Button>
        </div>
      </div>
    </section>
  );
}
