export default function normalize(st: string) {
  return st
    .normalize()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}
