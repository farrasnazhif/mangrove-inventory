"use client";

import { Fish, ShieldCheck, Waves } from "lucide-react";
import { formatNumber } from "@/features/inventory/api/format";
import { usePlotSelection } from "@/features/inventory/components/plot-provider";
import { CountUp } from "./count-up";

const REASONS = [
  { icon: <Waves size={20} />, title: "Gudang karbon biru", body: "Karbon tersimpan di batang, akar, dan lumpur yang tergenang, sehingga bertahan lama." },
  { icon: <ShieldCheck size={20} />, title: "Pelindung pesisir", body: "Akar yang rapat meredam gelombang dan menahan abrasi di pesisir." },
  { icon: <Fish size={20} />, title: "Rumah satwa", body: "Ikan, udang, kepiting, dan burung bergantung pada hutan mangrove." },
];

export function LandingNumbers() {
  const { total } = usePlotSelection();
  const above = total.carbon ? (total.agc / total.carbon) * 100 : 0;
  const stats = [
    { value: total.carbon, unit: "ton C", label: "Karbon tersimpan", body: "Di batang, daun, dan akar seluruh pohon yang diukur." },
    { value: total.treeCount, unit: "pohon", label: "Pohon terukur", body: "Setiap pohon diberi tag dan diukur diameternya." },
    { value: total.co2e, unit: "ton CO₂", label: "Setara karbon dioksida", body: "Karbon dikalikan 44/12, ukuran yang lazim dipakai." },
  ];
  return (
    <section id="angka" className="l-band l-section scroll-mt-16">
      <div className="l-container">
        <div className="mb-10 max-w-2xl">
          <p className="l-eyebrow">angka kunci</p>
          <h2 className="l-h2">Hasil Pengukuran Seluruh Plot</h2>
        </div>
        <div className="l-grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="l-cell">
              <p className="l-stat">
                <CountUp value={stat.value} />
                <span className="ml-2 font-sans text-[16px] font-medium text-[var(--l-eyebrow)]">{stat.unit}</span>
              </p>
              <h3 className="l-h3">{stat.label}</h3>
              <p className="text-[15px] leading-relaxed">{stat.body}</p>
            </div>
          ))}
        </div>
        <div className="l-grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <div key={reason.title} className="l-cell">
              <span className="l-icon">{reason.icon}</span>
              <h3 className="l-h3 mt-2">{reason.title}</h3>
              <p className="text-[15px] leading-relaxed">{reason.body}</p>
            </div>
          ))}
          <div className="l-cell">
            <h3 className="l-h3">Di mana karbon disimpan?</h3>
            {/* the legend repeats both values as text, so the bar is decorative */}
            <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-[var(--l-border)]" aria-hidden>
              <div className="bg-[#22c55e]" style={{ width: `${above}%` }} />
              <div className="bg-[#22d3ee]" style={{ width: `${100 - above}%` }} />
            </div>
            <dl className="mt-1 flex flex-col gap-1 text-[14px]">
              <div className="flex items-center justify-between gap-2">
                <dt className="flex items-center gap-2"><span aria-hidden className="size-2.5 rounded-[3px] bg-[#22c55e]" />Batang dan daun</dt>
                <dd className="font-semibold">{formatNumber(above)}%</dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="flex items-center gap-2"><span aria-hidden className="size-2.5 rounded-[3px] bg-[#22d3ee]" />Akar</dt>
                <dd className="font-semibold">{formatNumber(100 - above)}%</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
