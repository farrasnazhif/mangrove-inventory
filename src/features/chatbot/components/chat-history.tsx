import { Plus } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import type { Conversation } from "../types/chat";

export function ChatHistory({
  conversations,
  activeId,
  onSelect,
  onNew,
}: {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={onNew}
        className="flex items-center gap-2 rounded-control px-2 py-2 text-left text-ink transition-colors hover:bg-hover-2"
      >
        <Plus size={16} />
        <Typography as="span" variant="bs" weight="medium">Percakapan baru</Typography>
      </button>
      {conversations.length === 0 ? (
        <Typography as="p" variant="c" className="px-2 py-2 text-ink-3">Belum ada riwayat.</Typography>
      ) : (
        conversations.map((conversation) => (
          <button
            key={conversation.id}
            type="button"
            aria-pressed={conversation.id === activeId}
            onClick={() => onSelect(conversation.id)}
            className={`flex flex-col gap-0.5 rounded-control px-2 py-2 text-left transition-colors hover:bg-hover-2 ${conversation.id === activeId ? "bg-field" : ""}`}
          >
            <Typography as="span" variant="bs" className="truncate text-ink">{conversation.turns[0].text}</Typography>
            <Typography as="span" variant="c" className="text-ink-3">{conversation.turns.length} pesan</Typography>
          </button>
        ))
      )}
    </div>
  );
}
