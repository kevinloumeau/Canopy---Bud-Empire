// Kevin's type rule: a line of text never ends with one word alone. tieLast joins the last two words of a label with a
// non-breaking space, so when the label wraps the last line keeps at least two words ("Serve 202 / customers" becomes
// "Serve / 202 customers"). A hyphen in the last word gets a word joiner after it, so "pre-rolls" cannot split into
// "pre-" and "rolls". Two-word labels are left alone: tying them would stop them wrapping at all in a narrow tile, and a
// two-word stack reads as a balanced pair. tests/lone-words-check.mjs scans the menus for any line this misses.
const NBSP = ' ', JOIN = '⁠';
export const tieLast = text => {
  const s = String(text).trim();
  if (!/\S\s+\S+\s+\S+$/.test(s)) return String(text);
  return s.replace(/\s+(\S+)$/, (_, word) => NBSP + word.replace(/-(?=\S)/g, '-' + JOIN));
};
