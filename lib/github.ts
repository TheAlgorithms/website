export function getFileRaw(url: string) {
  return url
    .replace("github.com", "raw.githubusercontent.com")
    .replace("/blob", "");
}
