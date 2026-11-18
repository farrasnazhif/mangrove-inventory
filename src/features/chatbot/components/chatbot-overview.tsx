"use client";

import { useState } from "react";
import ThinkingState from "@/components/ui/thinking-state";
import { PLOTS } from "@/features/ringkasan/constants/ringkasan-data";
import { dummyAnswer } from "../api/dummy-answer";
import { PLACEHOLDERS, ROLE_LABELS, ROLE_TABS, SEED_CONVERSATIONS, SUGGESTIONS, THINKING_ROWS } from "../constants/chat-data";
import type { ChatRole, ChatTurn, Conversation } from "../types/chat";
import { StaticAnswer, StreamedAnswer } from "./chat-answer";
import { ChatHistory } from "./chat-history";
import { ChatPanel } from "./chat-panel";
import { ChatSuggestions } from "./chat-suggestions";

const lastQuestion = (turns: ChatTurn[]) => turns.findLast((turn) => turn.role === "user")?.text;

const newConversation = (role: ChatRole): Conversation => ({ id: crypto.randomUUID(), role, turns: [] });

/** `roleTabs` is for managers only; the public visitor chatbot renders it with roleTabs={false}. */
export function ChatbotOverview({ roleTabs = true }: { roleTabs?: boolean }) {
  const [conversations, setConversations] = useState<Conversation[]>(() => [
    ...SEED_CONVERSATIONS,
    newConversation(roleTabs ? "manager" : "visitor"),
  ]);
  const [activeId, setActiveId] = useState(() => conversations[conversations.length - 1].id);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  // the one answer still streaming; every other answer is drawn static so history never replays
  const [streamId, setStreamId] = useState<string | null>(null);

  const active = conversations.find((item) => item.id === activeId) ?? conversations[0];
  // the tab is presentation only: it never grants access (PRD: Manager/Visitor tab is not authorization)
  const role = roleTabs ? active.role : "visitor";
  const history = conversations.filter((item) => item.role === role && item.turns.length > 0);

  function startChat(nextRole: ChatRole) {
    const empty = conversations.find((item) => item.role === nextRole && item.turns.length === 0);
    const next = empty ?? newConversation(nextRole);
    if (!empty) setConversations((all) => [...all, next]);
    setActiveId(next.id);
    setStreamId(null);
    setHistoryOpen(false);
  }

  const append = (id: string, turn: ChatTurn) =>
    setConversations((all) => all.map((item) => (item.id === id ? { ...item, turns: [...item.turns, turn] } : item)));

  async function send(text: string) {
    const id = active.id;
    setStreamId(null);
    append(id, { id: crypto.randomUUID(), role: "user", text });
    setPendingId(id);
    try {
      // shortcut: fake 2.6 s latency (long enough for the thinking steps) over canned answers, swap for the chatbot API call.
      const reply = await new Promise<ReturnType<typeof dummyAnswer>>((resolve) =>
        setTimeout(() => resolve(dummyAnswer(role, text, PLOTS)), 2600),
      );
      const replyId = crypto.randomUUID();
      append(id, { id: replyId, role: "assistant", ...reply });
      setStreamId(replyId);
    } catch {
      append(id, { id: crypto.randomUUID(), role: "assistant", text: "Maaf, terjadi kesalahan. Coba kirim ulang pertanyaan." });
    } finally {
      setPendingId((current) => (current === id ? null : current));
    }
  }

  return (
    <ChatPanel
      tabs={roleTabs ? ROLE_TABS : []}
      activeTab={ROLE_LABELS[role]}
      onTabChange={(label) => startChat(label === ROLE_LABELS.visitor ? "visitor" : "manager")}
      turns={active.turns}
      pending={pendingId === active.id}
      loadingState={
        <ThinkingState
          key={active.turns[active.turns.length - 1]?.id}
          rows={THINKING_ROWS}
          active="Berpikir"
          done="Selesai berpikir"
        />
      }
      renderAnswer={(turn) =>
        turn.id === streamId ? (
          <StreamedAnswer
            text={turn.text}
            sourced={turn.sourced ?? false}
            followUps={SUGGESTIONS[role].filter((question) => question !== lastQuestion(active.turns)).slice(0, 2)}
            onFollowUp={send}
          />
        ) : (
          <StaticAnswer text={turn.text} />
        )
      }
      onSend={send}
      placeholder={PLACEHOLDERS[role]}
      onHistory={() => setHistoryOpen((open) => !open)}
      historyOpen={historyOpen}
      historyPanel={
        <ChatHistory
          conversations={history}
          activeId={active.id}
          onNew={() => startChat(role)}
          onSelect={(id) => {
            setActiveId(id);
            setStreamId(null);
            setHistoryOpen(false);
          }}
        />
      }
      emptyState={
        <ChatSuggestions
          title="Coba tanyakan:"
          questions={SUGGESTIONS[role]}
          onAsk={send}
        />
      }
    />
  );
}
