/**
 * Zero-pads a 0-based index for editorial number marks (01, 02, …).
 * @param {number} index
 * @param {{ base?: number, digits?: number }} [options]
 */
export function padIndex(index, { base = 1, digits = 2 } = {}) {
  return String(index + base).padStart(digits, "0");
}
