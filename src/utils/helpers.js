/**
 * Derive 2-letter initials from a company name for logo fallback.
 * "Times of India" → "TI", "HDFC Bank" → "HB"
 */
export function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const BG_COLORS = ["#e6f7f1", "#e6f1fb", "#faeeda", "#fbeaf0", "#eeedfe"];
const TEXT_COLORS = ["#0f6e56", "#185fa5", "#854f0b", "#993556", "#3c3489"];

/** Deterministic colour per internship id, avoids rainbow cycling. */
export function getLogoColors(id) {
  const idx = id % BG_COLORS.length;
  return { bg: BG_COLORS[idx], text: TEXT_COLORS[idx] };
}

/** Format stipend value for display (e.g. 50000 → "₹50k"). */
export function formatStipend(value) {
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
  return `₹${value}`;
}

/** Clamp a list of location names to a readable string. */
export function formatLocations(names, max = 2) {
  const shown = names.slice(0, max).join(", ");
  const rest = names.length - max;
  return rest > 0 ? `${shown} +${rest}` : shown;
}
