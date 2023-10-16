import Script from "next/script";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          id="Adsense-id"
          data-ad-client="ca-pub-8448763122793144"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          crossOrigin="anonymous"
          async
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
