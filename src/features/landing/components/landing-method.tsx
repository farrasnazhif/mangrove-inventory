import Link from "next/link";
import { FORMULAS } from "@/features/inventory/constants/method";
import { FormulaDialog } from "@/features/perhitungan-karbon/components/formula-dialog";

export function LandingMethod() {
  const cells = [
    { image: "ukur-pohon", title: "Ukur pohon", body: "Tim lapangan memberi tag pada tiap pohon dan mengukur diameter batangnya setinggi dada.", link: <a href="#angka" className="l-link">Lihat angkanya →</a> },
    {
      image: "hitung-biomassa",
      title: "Hitung biomassa",
      body: "Diameter dan kerapatan kayu dimasukkan ke persamaan ilmiah untuk menduga berat batang, daun, dan akar.",
      link: <FormulaDialog formulas={FORMULAS} trigger={(open) => <button type="button" onClick={open} className="l-link">Lihat rumusnya →</button>} />,
    },
    { image: "ubah-karbon", title: "Ubah jadi karbon", body: "Sekitar separuh biomassa adalah karbon. Hasilnya dijumlahkan menjadi stok karbon seluruh area.", link: <a href="#angka" className="l-link">Lihat hasilnya →</a> },
    { image: "petakan-hasil", title: "Petakan hasilnya", body: "Setiap titik jenis tumbuhan ditampilkan di atas citra satelit, per zona.", link: <Link href="/peta-vak" className="l-link">Buka peta →</Link> },
  ];
  return (
    <section id="cara-kerja" className="l-section scroll-mt-16">
      <div className="l-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="l-eyebrow">cara kerja</p>
            <h2 className="l-h2">Empat Langkah dari Pengukuran Lapangan hingga Pemetaan Stok Karbon</h2>
            <p className="l-lead mt-4">Langkah yang sama dilakukan di setiap vak, dari ukur pohon sampai peta.</p>
          </div>
          <Link href="/peta-vak" className="l-link">Jelajahi peta →</Link>
        </div>
        <div className="l-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cells.map((cell) => (
            <div key={cell.title} className="l-cell">
              {/* shortcut: placeholder photos are specimen shots from the atlas, swap in field photos at public/images/landing/ */}
              <div className="l-card-img" style={{ "--card-img": `url(/images/landing/${cell.image}.jpg)` } as React.CSSProperties} />
              <h3 className="l-h3 mt-2">{cell.title}</h3>
              <p className="flex-1 text-[15px] leading-relaxed">{cell.body}</p>
              <div className="mt-2">{cell.link}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
