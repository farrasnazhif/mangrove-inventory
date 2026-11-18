export const UNAVAILABLE = "Data tidak tersedia";

export const formatNumber = (value: number | null, digits = 1) =>
  value === null ? "-" : value.toLocaleString("id-ID", { minimumFractionDigits: digits, maximumFractionDigits: digits });

const dms = (value: number, positive: string, negative: string) => {
  const abs = Math.abs(value);
  const deg = Math.floor(abs);
  const min = Math.floor((abs - deg) * 60);
  const sec = ((abs - deg) * 60 - min) * 60;
  return `${deg}°${min}'${sec.toFixed(2)}" ${value >= 0 ? positive : negative}`;
};

export const formatCoordinates = ([lat, lng]: [number, number]) => `${dms(lat, "N", "S")} ${dms(lng, "E", "W")}`;
