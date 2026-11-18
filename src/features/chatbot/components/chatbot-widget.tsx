"use client";

import { useRef, useState } from "react";
import { BotMessageSquare, X } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import { ChatbotOverview } from "./chatbot-overview";

// open: a soft spring so the panel settles instead of stopping; close: a short ease-in so it gets out of the way
const OPEN = {
  type: "spring",
  stiffness: 380,
  damping: 32,
  mass: 0.9,
  opacity: { duration: 0.14, ease: "easeOut" },
} as const;
const CLOSE = {
  duration: 0.16,
  ease: [0.4, 0, 1, 1],
  opacity: { duration: 0.12 },
} as const;

/** Floating launcher + panel pinned to the bottom-right of the content area (below the top bar) on every dashboard page. The panel stays mounted (display: none) while closed so the conversation survives. */
export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            launcher.current?.focus();
          }
        }}
      >
        <button
          ref={launcher}
          type="button"
          aria-label={open ? "Tutup chatbot" : "Buka chatbot"}
          aria-expanded={open}
          aria-controls="chatbot-panel"
          onClick={() => setOpen((value) => !value)}
          className="order-2 flex size-12 items-center justify-center rounded-full bg-canvas shadow-2xl dark:bg-line transition-transform duration-150 active:scale-[0.96]"
        >
          {/* both icons stay mounted and cross-fade together, so there is no gap while they swap */}
          <span className="relative flex size-5 items-center justify-center">
            <motion.span
              className="absolute flex"
              initial={false}
              animate={{
                opacity: open ? 0 : 1,
                rotate: open ? 70 : 0,
                scale: open ? 0.5 : 1,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <BotMessageSquare size={20} />
            </motion.span>
            <motion.span
              className="absolute flex"
              initial={false}
              animate={{
                opacity: open ? 1 : 0,
                rotate: open ? 0 : -70,
                scale: open ? 1 : 0.5,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <X size={20} />
            </motion.span>
          </span>
        </button>
        <motion.section
          id="chatbot-panel"
          aria-label="Chatbot"
          initial={false}
          animate={open ? "open" : "closed"}
          variants={{
            open: {
              display: "block",
              opacity: 1,
              scale: 1,
              y: 0,
              transition: OPEN,
            },
            closed: {
              opacity: 0,
              scale: 0.9,
              y: 20,
              transition: CLOSE,
              transitionEnd: { display: "none" },
            },
          }}
          // inert covers the closing animation, before display: none lands (keeps focus and clicks out of the fading panel)
          inert={!open}
          style={{ transformOrigin: "bottom right" }}
          className="order-1 h-[min(580px,calc(100dvh-3.5rem-6.5rem))] w-[min(380px,calc(100vw-2rem))] rounded-[14px] shadow-overlay"
        >
          <ChatbotOverview />
        </motion.section>
      </div>
    </MotionConfig>
  );
}
