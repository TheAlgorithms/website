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
      <meta charSet="utf-8" />
      <meta property="og:image" content="/logo_t.svg" />
      <meta property="og:url" content="https://the-algorithms.com" />
      <meta property="og:type" content="website" />
      <script type="application/ld+json">
        {`{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://the-algorithms.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://the-algorithms.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}`}
      </script>
      <script type="application/ld+json">
        {`{
  "@context": "https://schema.org",
  "@type": "Organization",
  "url": "https://the-algorithms.com",
  "logo": "https://the-algorithms.com/logo.svg"
}`}
      </script>
    </NextHead>
  );
}
