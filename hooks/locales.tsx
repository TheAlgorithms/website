import locales from "lib/locales";
import { useRouter } from "next/router";

export default function useLocales() {
  const router = useRouter();
  return locales.filter((locale) => router.locales.includes(locale.code));
}
