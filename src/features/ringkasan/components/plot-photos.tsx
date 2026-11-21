import { ImageIcon } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { UNAVAILABLE } from "@/features/inventory/api/format";

// shortcut: no photos exist in the source data and no storage is chosen; replace with real images when attachments are approved.
export function PlotPhotos() {
  return (
    <section aria-label="Dokumentasi visual vak">
      <Typography as="h3" variant="t" weight="semibold">Dokumentasi Visual Vak</Typography>
      <div className="mt-3 flex h-44 shrink-0 items-center justify-center gap-2 rounded-card bg-inset text-ink-3 shadow-hairline">
        <ImageIcon size={20} aria-hidden />
        <Typography as="p" variant="bs">Foto lapangan: {UNAVAILABLE.toLowerCase()}</Typography>
      </div>
    </section>
  );
}
