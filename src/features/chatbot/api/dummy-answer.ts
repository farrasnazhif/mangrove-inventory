import type { PlotStats } from "@/features/inventory/types/inventory";
import type { ChatRole } from "../types/chat";

// shortcut: keyword matching over the tagging-workbook plot totals, not retrieval or a model; replace with the real chatbot call (FR-12/FR-41).

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII"];

const fmt = (value: number) => value.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** "vak iv", "Vak-4", "zona 2 ma" -> the workbook plot; null when the question names no plot */
function findPlot(question: string, plots: PlotStats[]) {
  const vak = /vak[\s-]*([ivx]+|\d{1,2})\b/i.exec(question);
  const zona = /zona[\s-]*(\d)\b/i.exec(question);
  if (zona) return { name: `Zona ${zona[1]} MA`, stats: plots.find((item) => item.plot.label === `Zona ${zona[1]} MA`) };
  if (!vak) return null;
  const raw = vak[1].toUpperCase();
  const number = /^\d+$/.test(raw) ? Number(raw) : ROMAN.indexOf(raw) + 1;
  const name = `VAK ${number}`;
  // the workbook names Vak XIII "Zona 5 MA = VAK 13"
  return { name, stats: plots.find((item) => item.plot.label === name || (number === 13 && item.plot.label.endsWith("VAK 13"))) };
}

function plotBreakdown({ plot, treeCount, speciesCount, agc, bgc, carbon, co2e, soc, area, carbonPerHa }: PlotStats) {
  const agcShare = Math.round((agc / carbon) * 1000) / 10;
  return [
    `Berdasarkan data tagging pohon 2026, ${plot.label} memiliki ${treeCount} pohon dari ${speciesCount} jenis dengan total stok karbon biomassa ${fmt(carbon)} ton C.`,
    "",
    "Berikut rinciannya:",
    `- Aboveground Carbon (AGC): ${fmt(agc)} ton C (${fmt(agcShare)}%)`,
    `- Belowground Carbon (BGC): ${fmt(bgc)} ton C (${fmt(Math.round((1000 - agcShare * 10)) / 10)}%)`,
    soc === null ? "- Soil Organic Carbon (SOC): data tidak tersedia (belum ada data inti sedimen)" : `- Soil Organic Carbon (SOC): ${fmt(soc)} Mg C/ha`,
    "",
    `Total AGC + BGC setara dengan sekitar ${fmt(co2e)} ton CO₂e. ${area && carbonPerHa !== null ? `Dengan luas ${fmt(area)} ha, stok biomassa karbon ${fmt(carbonPerHa)} ton C/ha.` : "Nilai per hektar tidak tersedia karena luas plot belum diisi."}`,
  ].join("\n");
}

const GENERAL: [RegExp, string][] = [
  [/karbon biru|blue carbon/i, "Karbon biru adalah karbon yang tersimpan di ekosistem pesisir seperti mangrove, lamun, dan rawa payau. Ekosistem ini menyimpan karbon dalam biomassa dan terutama di tanah yang tergenang, sehingga bisa bertahan lama."],
  [/stok karbon/i, "Stok karbon adalah jumlah karbon yang tersimpan di suatu ekosistem pada waktu tertentu. Pada mangrove, stok ini dihitung dari biomassa di atas tanah (AGC), biomassa akar (BGC), dan karbon organik tanah (SOC), dengan satuan Mg C/ha."],
  [/penting|manfaat|fungsi/i, "Mangrove melindungi pesisir dari abrasi dan gelombang, menjadi tempat berkembang biak ikan dan udang, menyaring air, dan menyimpan karbon dalam jumlah besar."],
  [/mangrove/i, "Mangrove adalah hutan pesisir yang tumbuh di zona pasang surut. Di kawasan Pamurbaya, Surabaya, jenis yang umum antara lain Avicennia marina (api-api) dan Rhizophora mucronata (bakau)."],
];

const HELP = "Maaf, saya belum paham pertanyaannya. Coba pilih salah satu contoh pertanyaan, atau sebutkan vak, misalnya “Berapa total stok karbon Vak IV?”.";

export type DummyAnswer = { text: string; sourced: boolean };

export function dummyAnswer(role: ChatRole, question: string, allPlots: PlotStats[]): DummyAnswer {
  const q = question.toLowerCase();
  const named = findPlot(question, allPlots);
  const wantsData = named || /rata|rerata|tertinggi|terendah|terbesar|terkecil|semua (?:plot|vak)|jumlah (?:plot|vak)|daftar (?:plot|vak)/.test(q);
  const plain = (text: string) => ({ text, sourced: false });
  const sourced = (text: string) => ({ text, sourced: true });

  if (wantsData) {
    if (role === "visitor") {
      return plain("Data stok karbon per vak belum dipublikasikan untuk pengunjung. Saya bisa menjawab pertanyaan umum tentang mangrove dan stok karbon.");
    }
    if (named) {
      if (!named.stats?.treeCount) return plain(`Data pohon untuk ${named.name} tidak tersedia dalam inventarisasi saat ini.`);
      if (/pohon|jumlah/.test(q)) return sourced(`${named.stats.plot.label} tercatat memiliki ${named.stats.treeCount} pohon dari ${named.stats.speciesCount} jenis.`);
      return sourced(plotBreakdown(named.stats));
    }
    const plots = allPlots.filter((item) => item.treeCount > 0);
    const sorted = [...plots].sort((a, b) => b.carbon - a.carbon);
    const high = sorted[0];
    const low = sorted[sorted.length - 1];
    if (/terendah|terkecil/.test(q)) return sourced(`Stok karbon terendah ada di ${low.plot.label} sebesar ${fmt(low.carbon)} ton C.`);
    if (/tertinggi|terbesar/.test(q)) return sourced(`Stok karbon tertinggi ada di ${high.plot.label} sebesar ${fmt(high.carbon)} ton C.`);
    if (/rata|rerata/.test(q)) {
      const mean = plots.reduce((sum, item) => sum + item.carbon, 0) / plots.length;
      return sourced(`Rata-rata stok karbon biomassa dari ${plots.length} vak yang memiliki data pohon adalah ${fmt(mean)} ton C per vak. Nilai per hektar tidak tersedia karena luas plot belum diisi.`);
    }
    return sourced(`Saat ini ada ${plots.length} vak dengan data pohon: ${plots.map((item) => item.plot.label).join(", ")}.`);
  }
  return plain(GENERAL.find(([pattern]) => pattern.test(q))?.[1] ?? HELP);
}
