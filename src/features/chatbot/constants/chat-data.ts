import type { StreamingSource } from "@/components/ui/streaming-text";
import type { ChatRole, Conversation } from "../types/chat";

// shortcut: dummy sample data and canned answers, not an approved chatbot source; replace with the Langflow/FastAPI call once Q-01/Q-08 settle.

export const ROLE_LABELS: Record<ChatRole, string> = { manager: "Manager", visitor: "Visitor" };

export const ROLE_TABS = [ROLE_LABELS.manager, ROLE_LABELS.visitor];

/** steps the ThinkingState shows while an answer is prepared (dummy: the real steps come from the chatbot flow) */
export const THINKING_ROWS = [
  { primary: "Membaca pertanyaan" },
  { primary: "Mencari data inventarisasi" },
  { primary: "Menghitung stok karbon" },
  { primary: "Menyusun jawaban" },
];

export const PLACEHOLDERS: Record<ChatRole, string> = {
  manager: "Tanya data plot, analisis stok karbon, dan data lainnya",
  visitor: "Tanya tentang mangrove dan stok karbon",
};

export const SUGGESTIONS: Record<ChatRole, string[]> = {
  manager: [
    "Berapa total stok karbon Vak IV?",
    "Plot mana yang stok karbonnya tertinggi?",
    "Berapa rata-rata stok karbon semua plot?",
    "Berapa jumlah pohon di Vak I?",
  ],
  visitor: [
    "Apa itu stok karbon?",
    "Kenapa mangrove penting?",
    "Apa itu karbon biru?",
  ],
};

export const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: "seed-1",
    role: "manager",
    turns: [
      { id: "seed-1-q", role: "user", text: "Berapa rata-rata stok karbon semua plot?" },
      { id: "seed-1-a", role: "assistant", text: "Contoh riwayat percakapan. Tanyakan lagi untuk jawaban terbaru." },
    ],
  },
  {
    id: "seed-2",
    role: "manager",
    turns: [
      { id: "seed-2-q", role: "user", text: "Apa itu stok karbon?" },
      { id: "seed-2-a", role: "assistant", text: "Contoh riwayat percakapan. Tanyakan lagi untuk jawaban terbaru." },
    ],
  },
  {
    id: "seed-3",
    role: "visitor",
    turns: [
      { id: "seed-3-q", role: "user", text: "Kenapa mangrove penting?" },
      { id: "seed-3-a", role: "assistant", text: "Contoh riwayat percakapan. Tanyakan lagi untuk jawaban terbaru." },
    ],
  },
];

/** the one source dummy inventory answers cite: the Ringkasan page that holds the sample plots */
export const INVENTORY_SOURCE: StreamingSource = {
  name: "Data inventarisasi",
  domain: "Ringkasan",
  href: "/ringkasan",
  image:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%231f7a5f'/%3E%3Cpath d='M17 45V25h8v20h-8Zm11 0V16h8v29h-8Zm11 0V30h8v15h-8Z' fill='%23fff'/%3E%3C/svg%3E",
};
