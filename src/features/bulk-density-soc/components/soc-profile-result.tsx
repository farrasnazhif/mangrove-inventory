import { Card } from "@/components/ui/card";
import { Notice } from "@/components/ui/notice";
import { Typography } from "@/components/ui/typography";

export function SocProfileResult() {
  return (
    <Card className="flex flex-col gap-4">
      <div>
        <Typography as="h2" variant="t" weight="semibold">
          Ringkasan SOC Plot
        </Typography>
        <Typography as="p" variant="bs" className="mt-1 text-ink-2">
          Total profil akan tersedia setelah data laboratorium dan metode disetujui.
        </Typography>
      </div>
      <Notice tone="info">
        <Typography as="span" variant="bs">
          Profil belum lengkap. Nilai SOC tidak dihitung atau diganti dengan nol.
        </Typography>
      </Notice>
      <div className="rounded-control border border-line bg-inset p-4">
        <Typography as="p" variant="c" weight="medium" className="text-ink-3">
          SOC total
        </Typography>
        <Typography as="p" variant="bl" weight="semibold" className="mt-1">
          Belum tersedia
        </Typography>
        <Typography as="p" variant="c" className="mt-1 text-ink-3">
          Mg C/ha
        </Typography>
      </div>
    </Card>
  );
}
