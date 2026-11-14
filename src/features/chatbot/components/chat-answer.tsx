import type { ReactNode } from "react";
import StreamingText from "@/components/ui/streaming-text";
import { INVENTORY_SOURCE } from "../constants/chat-data";

/** Static answer for older turns: blank line = new paragraph, "- " lines = bullet list. */
export function StaticAnswer({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let items: string[] = [];
  const flush = () => {
    if (!items.length) return;
    blocks.push(
      <ul key={`l${blocks.length}`} className="list-disc space-y-0.5 pl-5">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>,
    );
    items = [];
  };
  for (const line of text.split("\n")) {
    if (line.startsWith("- ")) items.push(line.slice(2));
    else {
      flush();
      blocks.push(line ? <p key={`p${blocks.length}`}>{line}</p> : <div key={`b${blocks.length}`} className="h-2" />);
    }
  }
  flush();
  return <div className="text-[13px] leading-normal text-ink">{blocks}</div>;
}

/** The newest answer, streamed word by word with the shared StreamingText (sources and follow-ups included). */
export function StreamedAnswer({
  text,
  sourced,
  followUps,
  onFollowUp,
}: {
  text: string;
  sourced: boolean;
  followUps: string[];
  onFollowUp: (question: string) => void;
}) {
  // StreamingText renders words in one paragraph; pre-line keeps our line breaks, "•" stands in for list bullets
  const content = text.replaceAll("\n- ", "\n• ").split(" ").map((word) => ({ text: word }));
  return (
    <div className="[&_p]:whitespace-pre-line">
      <StreamingText
        fill
        loop={false}
        content={content}
        sources={sourced ? [INVENTORY_SOURCE] : []}
        followUps={followUps}
        labels={{ sources: sourced ? "1 sumber" : "Tanpa sumber", followUps: "Pertanyaan lanjutan" }}
        onFollowUp={onFollowUp}
      />
    </div>
  );
}
