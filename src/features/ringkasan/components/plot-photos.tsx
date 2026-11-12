import { ImageIcon } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import type { PlotPhoto } from "../types/ringkasan";

export function PlotPhotos({ photos }: { photos: PlotPhoto[] }) {
  return (
    <section aria-label="Dokumentasi visual plot">
      <div className="flex items-center justify-between">
        <Typography as="h3" variant="t" weight="semibold">Dokumentasi Visual Plot</Typography>
        <Typography as="span" variant="c" weight="medium" className="uppercase tracking-wider text-ink-3">
          {photos.length} foto lapangan
        </Typography>
      </div>
      <ul className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {photos.map((photo) => (
          <li key={photo.label} className="overflow-hidden rounded-card bg-field shadow-hairline">
            {/* shortcut: placeholder tile, no photo storage yet; swap for a real image when attachments are approved */}
            <div className="relative flex h-44 items-center justify-center bg-inset text-ink-3">
              <ImageIcon size={28} aria-hidden />
              <span className="absolute left-2 top-2 rounded-chip bg-ink px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-surface">
                {photo.label}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-2">
              <Typography as="span" variant="bs" weight="medium">{photo.caption}</Typography>
              <Typography as="span" variant="bs" className="text-ink-3">{photo.note}</Typography>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
