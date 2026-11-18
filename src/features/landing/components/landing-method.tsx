import Link from "next/link";
import { Calculator, ClipboardList, Leaf, Map } from "lucide-react";
import { FORMULAS } from "@/features/inventory/constants/method";
import { FormulaDialog } from "@/features/perhitungan-karbon/components/formula-dialog";

export function LandingMethod() {
  const cells = [
    { icon: <ClipboardList size={20} />, title: "Ukur pohon", body: "Tim lapangan memberi tag pada tiap pohon dan mengukur diameter batangnya setinggi dada.", link: <a href="#angka" className="l-link">Lihat angkanya →</a> },
    {
      icon: <Calculator size={20} />,
      title: "Hitung biomassa",
      body: "Diameter dan kerapatan kayu dimasukkan ke persamaan ilmiah untuk menduga berat batang, daun, dan akar.",
      link: <FormulaDialog formulas={FORMULAS} trigger={(open) => <button type="button" onClick={open} className="l-link">Lihat rumusnya →</button>} />,
    },
    { icon: <Leaf size={20} />, title: "Ubah jadi karbon", body: "Sekitar separuh biomassa adalah karbon. Hasilnya dijumlahkan menjadi stok karbon seluruh area.", link: <a href="#angka" className="l-link">Lihat hasilnya →</a> },
    { icon: <Map size={20} />, title: "Petakan hasilnya", body: "Setiap titik jenis tumbuhan ditampilkan di atas citra satelit, per zona.", link: <Link href="/peta-plot" className="l-link">Buka peta →</Link> },
  ];
  return (
    <section id="cara-kerja" className="l-section scroll-mt-16">
      <div className="l-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="l-eyebrow">cara kerja</p>
            <h2 className="l-h2">Dari Pohon Menjadi Angka Karbon</h2>
            <p className="l-lead mt-4">Empat langkah yang sama untuk setiap plot, dari pengukuran sampai peta.</p>
          </div>
          <Link href="/peta-plot" className="l-link">Jelajahi peta →</Link>
        </div>
        <div className="l-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cells.map((cell) => (
            <div key={cell.title} className="l-cell">
              <span className="l-icon">{cell.icon}</span>
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
