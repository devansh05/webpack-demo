export const trim = (value: string): string =>
  value
    .replace(/^\s+/, "")
    .replace(/\s+$/, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^\s+|\s+$/g, "");
