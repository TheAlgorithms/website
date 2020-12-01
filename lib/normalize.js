export function normalize(st) {
  return st
    .normalize()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export function normalizeWeak(st) {
  return st
    .normalize()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/ /g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}
