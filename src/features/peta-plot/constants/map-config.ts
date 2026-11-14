// shortcut: keyless Esri World Imagery URL for the dummy map, switch to the keyed ArcGIS endpoint and confirm Esri terms before launch (Q-06).
export const TILE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
export const TILE_ATTRIBUTION =
  "Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics";
export const MAP_ZOOM = { min: 14, max: 21, nativeMax: 19, clusterOffAt: 20 };

// Zone colours follow the reference screenshot: teal in the west, green in the middle, yellow-green east, yellow and orange along the north.
const TEAL = "oklch(0.62 0.09 185)";
const GREEN = "oklch(0.65 0.15 145)";
const LIME = "oklch(0.78 0.16 120)";
const YELLOW = "oklch(0.82 0.15 100)";
export const ZONE_COLORS: Record<string, string> = {
  "Vak I": TEAL,
  "Vak II": TEAL,
  "Vak III": TEAL,
  "Vak IV": GREEN,
  "Vak V": LIME,
  "Vak VI": LIME,
  "Vak VII": GREEN,
  "Vak VIII": LIME,
  "Vak IX": LIME,
  "Vak X": LIME,
  "Vak XI": YELLOW,
  "Vak XII": YELLOW,
  "Vak XIII": "oklch(0.75 0.14 70)",
};
export const ZONE_COLOR_FALLBACK = GREEN;
