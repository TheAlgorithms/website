import NextHead from "next/head";

export default function Head({ title }: { title?: string }) {
  return (
    <NextHead>
      <title>{title ? `${title} - The Algorithms` : "The Algorithms"}</title>
      <link rel="icon" type="image/svg+xml" href="/logo_t.svg" />
    </NextHead>
  );
}
