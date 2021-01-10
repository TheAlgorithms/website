export function normalize(st: string) {
  return st
    .normalize()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export function normalizeWeak(st: string) {
  return st
    .normalize()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/ /g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}
