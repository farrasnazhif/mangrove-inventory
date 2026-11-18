/** downloads a CSV in the browser; every field is quoted so decimal commas survive */
export function downloadCsv(filename: string, header: string[], rows: (string | number | null)[][]) {
  const quote = (value: string | number | null) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const text = [header, ...rows].map((row) => row.map(quote).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob(["﻿" + text], { type: "text/csv;charset=utf-8" }));
  const link = Object.assign(document.createElement("a"), { href: url, download: filename });
  link.click();
  URL.revokeObjectURL(url);
}
