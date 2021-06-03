import Head from "next/head";

export default function PlausibleScript() {
  return (
    <Head>
      <script
        key="plausible-script"
        src="https://plausible.the-algorithms.com/js/plausible.js"
        async
        defer
        data-domain="the-algorithms.com"
      />
    </Head>
  );
}
