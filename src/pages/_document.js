import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>captiongen</title>
        <meta name="title" content="captiongen" />
        <meta
          name="description"
          content="Generate the perfect caption with the help of ChatGPT."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://captiongen.szhao.dev/" />
        <meta property="og:title" content="captiongen" />
        <meta
          property="og:description"
          content="Generate the perfect caption with the help of ChatGPT."
        />
        <meta
          property="og:image"
          content="https://captiongen.szhao.dev/preview.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://captiongen.szhao.dev/" />
        <meta property="twitter:title" content="captiongen" />
        <meta
          property="twitter:description"
          content="Generate the perfect caption with the help of ChatGPT."
        />
        <meta
          property="twitter:image"
          content="https://captiongen.szhao.dev/preview.png"
        />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
