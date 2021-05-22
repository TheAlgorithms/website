import NextHead from "next/head";

export default function Head({
  title,
  description,
  tags = [],
}: {
  title?: string;
  description?: string;
  tags?: string[];
}) {
  return (
    <NextHead>
      <title>{title ? `${title} - The Algorithms` : "The Algorithms"}</title>
      <link rel="icon" type="image/svg+xml" href="/logo_t.svg" />
      {description && <meta name="description" content={description} />}
      <meta name="keywords" content={["The Algorithms", ...tags].join(", ")} />
    </NextHead>
  );
}
