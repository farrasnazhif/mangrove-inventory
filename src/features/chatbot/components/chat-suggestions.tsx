import { Typography } from "@/components/ui/typography";

export function ChatSuggestions({
  title,
  questions,
  onAsk,
}: {
  title: string;
  questions: string[];
  onAsk: (question: string) => void;
}) {
  return (
    <div className="flex flex-1 flex-col justify-end gap-3">
      <Typography as="p" variant="c" className="text-ink-2">
        {title}
      </Typography>
      <div className="flex flex-col items-start gap-2">
        {questions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => onAsk(question)}
            className="rounded-control border border-line bg-field px-3 py-1.5 text-left text-[13px] text-ink transition-[background-color,transform] duration-150 hover:bg-hover-2 active:scale-[0.98]"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
