import type { PlotSummary } from "@/features/ringkasan/types/ringkasan";
import type { ChatRole } from "../types/chat";

// shortcut: keyword matching over the dummy Ringkasan plots, not retrieval or a model; replace with the real chatbot call (FR-12/FR-41).

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII"];
const CO2E_PER_C = 44 / 12;

const fmt = (value: number) => value.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const total = (plot: PlotSummary) => plot.agb + plot.bgb + plot.soc;

/** "vak iv", "Vak-4" -> "Vak IV"; null when the question names no plot */
function plotCode(question: string) {
  const match = /vak[\s-]*([ivx]+|\d{1,2})\b/i.exec(question);
  if (!match) return null;
  const raw = match[1].toUpperCase();
  const roman = /^\d+$/.test(raw) ? ROMAN[Number(raw) - 1] : raw;
  return roman ? `Vak ${roman}` : null;
}

function plotBreakdown(plot: PlotSummary) {
  const sum = total(plot);
  const agbShare = Math.round((plot.agb / sum) * 1000) / 10;
  const bgbShare = Math.round((plot.bgb / sum) * 1000) / 10;
  const socShare = Math.round((1000 - agbShare * 10 - bgbShare * 10)) / 10; // remainder so the shares add to 100%
  return [
    `Berdasarkan data inventarisasi, Plot ${plot.code} di kawasan ${plot.site} memiliki total stok karbon sebesar ${fmt(sum)} Mg C/ha.`,
    "",
    "Berikut rincian stok karbonnya:",
    `- Aboveground Carbon (AGC): ${fmt(plot.agb)} Mg C/ha (${fmt(agbShare)}%)`,
    `- Belowground Carbon (BGC): ${fmt(plot.bgb)} Mg C/ha (${fmt(bgbShare)}%)`,
    `- Soil Organic Carbon (SOC): ${fmt(plot.soc)} Mg C/ha (${fmt(socShare)}%)`,
    "",
    `Total: ${fmt(sum)} Mg C/ha, atau setara dengan sekitar ${fmt(sum * CO2E_PER_C)} Mg CO₂e/ha.`,
    "",
    `Kontributor terbesar berasal dari ${agbShare >= socShare && agbShare >= bgbShare ? "biomassa mangrove di atas permukaan tanah (AGC)" : socShare >= bgbShare ? "karbon organik tanah (SOC)" : "biomassa akar (BGC)"}, yang menyumbang ${fmt(Math.max(agbShare, bgbShare, socShare))}% dari total stok karbon.`,
  ].join("\n");
}

const GENERAL: [RegExp, string][] = [
  [/karbon biru|blue carbon/i, "Karbon biru adalah karbon yang tersimpan di ekosistem pesisir seperti mangrove, lamun, dan rawa payau. Ekosistem ini menyimpan karbon dalam biomassa dan terutama di tanah yang tergenang, sehingga bisa bertahan lama."],
  [/stok karbon/i, "Stok karbon adalah jumlah karbon yang tersimpan di suatu ekosistem pada waktu tertentu. Pada mangrove, stok ini dihitung dari biomassa di atas tanah (AGC), biomassa akar (BGC), dan karbon organik tanah (SOC), dengan satuan Mg C/ha."],
  [/penting|manfaat|fungsi/i, "Mangrove melindungi pesisir dari abrasi dan gelombang, menjadi tempat berkembang biak ikan dan udang, menyaring air, dan menyimpan karbon dalam jumlah besar."],
  [/mangrove/i, "Mangrove adalah hutan pesisir yang tumbuh di zona pasang surut. Di kawasan Pamurbaya, Surabaya, jenis yang umum antara lain Avicennia marina (api-api) dan Rhizophora mucronata (bakau)."],
];

const HELP = "Maaf, saya belum paham pertanyaannya. Coba pilih salah satu contoh pertanyaan, atau sebutkan plot, misalnya “Berapa total stok karbon Vak IV?”.";

export type DummyAnswer = { text: string; sourced: boolean };

export function dummyAnswer(role: ChatRole, question: string, plots: PlotSummary[]): DummyAnswer {
  const q = question.toLowerCase();
  const code = plotCode(question);
  const wantsData = code || /rata|rerata|tertinggi|terendah|terbesar|terkecil|semua plot|jumlah plot|daftar plot/.test(q);
  const plain = (text: string) => ({ text, sourced: false });
  const sourced = (text: string) => ({ text, sourced: true });

  if (wantsData) {
    if (role === "visitor") {
      return plain("Data stok karbon per plot belum dipublikasikan untuk pengunjung. Saya bisa menjawab pertanyaan umum tentang mangrove dan stok karbon.");
    }
    if (code) {
      const plot = plots.find((item) => item.code === code);
      if (!plot) return plain(`Data ${code} belum tersedia dalam inventarisasi saat ini.`);
      if (/pohon|jumlah/.test(q)) return sourced(`Plot ${plot.code} di kawasan ${plot.site} tercatat memiliki ${plot.trees} pohon.`);
      return sourced(plotBreakdown(plot));
    }
    const sorted = [...plots].sort((a, b) => total(b) - total(a));
    const high = sorted[0];
    const low = sorted[sorted.length - 1];
    if (/terendah|terkecil/.test(q)) return sourced(`Stok karbon terendah ada di Plot ${low.code} (${low.site}) sebesar ${fmt(total(low))} Mg C/ha.`);
    if (/tertinggi|terbesar/.test(q)) return sourced(`Stok karbon tertinggi ada di Plot ${high.code} (${high.site}) sebesar ${fmt(total(high))} Mg C/ha.`);
    if (/rata|rerata/.test(q)) {
      const mean = plots.reduce((sum, plot) => sum + total(plot), 0) / plots.length;
      return sourced(`Rata-rata stok karbon dari ${plots.length} plot adalah ${fmt(mean)} Mg C/ha, atau sekitar ${fmt(mean * CO2E_PER_C)} Mg CO₂e/ha.`);
    }
    return sourced(`Saat ini ada ${plots.length} plot dengan data: ${plots.map((plot) => plot.code).join(", ")}.`);
  }
  return plain(GENERAL.find(([pattern]) => pattern.test(q))?.[1] ?? HELP);
}
