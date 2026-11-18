import { BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import type { PlotInfoCard } from "../types/data-lapangan";

export function PlotContext({ cards }: { cards: PlotInfoCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.id} className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <Typography as="p" variant="c" weight="medium" className="uppercase tracking-wide text-ink-3">
              {card.label}
            </Typography>
            {card.verified && <BadgeCheck size={16} className="text-green" aria-label="Terverifikasi" />}
            {card.badge && <Badge>{card.badge}</Badge>}
          </div>
          <Typography as="p" variant="bm" weight="semibold">{card.value}</Typography>
          <div className="border-t border-line pt-2">
            {card.actions ? (
              <div className="flex justify-between gap-2">
                {card.actions.map((action) => (
                  <Typography key={action} as="span" variant="bs" className="text-ink-2">{action}</Typography>
                ))}
              </div>
            ) : (
              <Typography as="p" variant="bs" className={card.verified ? "text-green" : "text-ink-2"}>{card.detail}</Typography>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
