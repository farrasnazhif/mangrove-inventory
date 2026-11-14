import type { SpeciesPoint } from "../types/map";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

export function speciesPopupHtml(point: SpeciesPoint) {
  return `<div class="tree-card">
    <div class="tree-card-photo">Foto belum tersedia</div>
    <div class="tree-card-body">
      <p class="tree-card-eyebrow">SPESIMEN NO. ${point.id}</p>
      <p class="tree-card-name">${escapeHtml(point.species)}</p>
      <p class="tree-card-note">${escapeHtml(point.note)}</p>
      <dl class="tree-card-meta">
        <div><dt>Zona :</dt><dd>${escapeHtml(point.zone)}</dd></div>
        <div><dt>Lokasi :</dt><dd>${point.position[0].toFixed(5)}, ${point.position[1].toFixed(5)}</dd></div>
      </dl>
    </div>
  </div>`;
}
