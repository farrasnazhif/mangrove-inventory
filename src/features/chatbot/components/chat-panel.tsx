"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Clock, Plus } from "lucide-react";
import type { ChatTurn } from "../types/chat";

/** Chatbot card: role tabs + history button, thread, composer. Fills its parent; the user owns the state. */
export function ChatPanel({
  turns,
  pending,
  loadingState,
  renderAnswer,
  tabs,
  activeTab,
  onTabChange,
  onSend,
  placeholder,
  emptyState,
  historyOpen,
  historyPanel,
  onHistory,
}: {
  turns: ChatTurn[];
  /** an answer is on its way: blocks sending and shows `loadingState` */
  pending: boolean;
  loadingState: ReactNode;
  /** how an assistant turn is drawn (streamed or static) */
  renderAnswer: (turn: ChatTurn) => ReactNode;
  /** empty for no tab row (the visitor chatbot) */
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSend: (text: string) => void;
  placeholder: string;
  emptyState: ReactNode;
  historyOpen: boolean;
  historyPanel: ReactNode;
  onHistory: () => void;
}) {
  const [draft, setDraft] = useState("");
  const input = useRef<HTMLTextAreaElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const stuck = useRef(true);
  // keep the newest text in view while it streams, unless the reader scrolled up
  useEffect(() => {
    const box = scroller.current;
    const inner = content.current;
    if (!box || !inner) return;
    const follow = () => stuck.current && box.scrollTo({ top: box.scrollHeight });
    const onScroll = () => {
      stuck.current = box.scrollHeight - box.scrollTop - box.clientHeight < 40;
    };
    const observer = new ResizeObserver(follow);
    observer.observe(inner);
    box.addEventListener("scroll", onScroll);
    return () => {
      observer.disconnect();
      box.removeEventListener("scroll", onScroll);
    };
  }, []);
  useEffect(() => {
    stuck.current = true;
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [turns.length, historyOpen]);

  const canSend = draft.trim().length > 0 && !pending;
  const send = () => {
    if (!canSend) return;
    onSend(draft.trim());
    setDraft("");
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[14px] bg-surface shadow-card">
      <div className="flex shrink-0 items-center justify-between border-b border-line p-1.5">
        <div className="flex items-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              aria-pressed={activeTab === tab}
              onClick={() => onTabChange(tab)}
              className={`rounded-[6px] px-2 py-[3px] text-[13px] text-ink transition-[background-color,opacity] duration-100 ${activeTab === tab ? "bg-field" : "opacity-50 hover:opacity-75"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="Riwayat percakapan"
          aria-pressed={historyOpen}
          onClick={onHistory}
          className={`flex size-6 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink-2 ${historyOpen ? "bg-field text-ink" : ""}`}
        >
          <Clock size={15} />
        </button>
      </div>
      <div
        ref={scroller}
        role="log"
        aria-live="polite"
        aria-label="Percakapan"
        className="min-h-0 flex-1 overflow-y-auto px-3 pt-2.5 pb-1"
      >
        <div ref={content} className="flex min-h-full flex-col gap-2.5">
        {historyOpen
          ? historyPanel
          : turns.length === 0
            ? emptyState
            : turns.map((turn) =>
                turn.role === "user" ? (
                  <div key={turn.id} className="flex justify-end pl-14">
                    <div className="rounded-xl bg-field px-3 py-1.5 text-[13px] leading-[1.4] text-ink">{turn.text}</div>
                  </div>
                ) : (
                  <div key={turn.id}>{renderAnswer(turn)}</div>
                ),
              )}
        {pending && !historyOpen && loadingState}
        </div>
      </div>
      <div className="shrink-0 p-1.5">
        <div
          role="presentation"
          onClick={() => input.current?.focus()}
          className="flex cursor-text flex-col gap-2 rounded-control border border-line bg-field p-2.5 transition-[border-color] duration-150 focus-within:border-line-strong"
        >
          <textarea
            ref={input}
            rows={2}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              // Shift+Enter keeps a newline; Enter during IME composition must not send
              if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                event.preventDefault();
                send();
              }
            }}
            placeholder={placeholder}
            aria-label="Pertanyaan"
            className="resize-none bg-transparent text-[13px] leading-[1.4] text-ink outline-none placeholder:text-ink-3"
          />
          <div className="flex items-center justify-end">
            <button
              type="button"
              aria-label="Kirim"
              disabled={!canSend}
              onClick={send}
              className="flex size-7 items-center justify-center rounded-[8px] transition-[background-color,color,transform] duration-200 enabled:active:scale-[0.96]"
              style={{
                background: canSend ? "var(--ink)" : "var(--line-strong)",
                color: canSend ? "var(--surface)" : "var(--ink-2)",
              }}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
