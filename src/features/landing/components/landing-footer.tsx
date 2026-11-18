import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="border-t border-[var(--l-border-strong)] py-10">
      <div className="l-container flex flex-wrap items-start justify-between gap-8">
        <div className="max-w-xs">
          <p className="l-serif text-[22px] font-semibold text-[var(--l-head)]">
            Mangrove Inventory
          </p>
          <p className="mt-2 text-[14px] text-[var(--l-eyebrow)]">
            Inventarisasi karbon mangrove Pamurbaya, Surabaya Timur.
          </p>
        </div>
        <nav
          aria-label="Tautan footer"
          className="flex flex-col gap-2 text-[14px]"
        >
          <Link href="/peta-plot" className="hover:underline">
            Peta Plot
          </Link>
          <a href="#cara-kerja" className="hover:underline">
            Cara kerja
          </a>
        </nav>
      </div>
      {/* <p className="l-container mt-8 text-[12px] text-[var(--l-eyebrow)]">Data tagging pohon 2026 · Demo, bukan publikasi resmi.</p> */}
    </footer>
  );
}
