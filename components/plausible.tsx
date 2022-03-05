import Script from "next/script";

export default function PlausibleScript() {
  return (
    <Script
      key="plausible-script"
      src="https://plausible.shorsh.de/js/plausible.js"
      data-domain="the-algorithms.com"
      strategy="lazyOnload"
    />
  );
}
