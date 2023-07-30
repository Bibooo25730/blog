import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            process.env.name
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="keywords" content={process.env.keywords} />
        <meta name="description" content={process.env.content}></meta>
        <meta name="google-site-verification" content="9AnzUNA1oCRKP8GAyUw0tOcYudtHeZAukQBz_CKaxxA" />
        <meta name="baidu_union_verify" content="0b6d3a0a4fb890f97fa9e21e9d47d481" />
        <link rel="alternate" type="application/rss+xml" title="" href="/feed.xml" />
        <link href="https://unpkg.com/nes.css@2.3.0/css/nes.min.css" rel="stylesheet" />
        <style>{`:root{--color-font:#222;--color-background-color:#fff; --step--2: clamp(0.78rem, calc(0.77rem + 0.03vw), 0.80rem);--step--1: clamp(0.94rem, calc(0.92rem + 0.11vw), 1.00rem); --step-0: clamp(1.13rem, calc(1.08rem + 0.22vw), 1.25rem);--step-1: clamp(1.35rem, calc(1.28rem + 0.37vw), 1.56rem); --step-2: clamp(1.62rem, calc(1.50rem + 0.58vw), 1.95rem);--step-3: clamp(1.94rem, calc(1.77rem + 0.87vw), 2.44rem); --step-4: clamp(2.33rem, calc(2.08rem + 1.25vw), 3.05rem);--step-5: clamp(2.80rem, calc(2.45rem + 1.77vw), 3.82rem);}@media screen and (prefers-color-scheme:dark){:root:not(.light){--color-font:hsla(0,0%,100%,.87);--color-background-color:#121212}}.dark{--color-font:hsla(0,0%,100%,.87);--color-background-color:#121212}body,html{color:var(--color-font);font-family:zpix, sans-serif;background-color:var(--color-background-color);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;-moz-tab-size:2;tab-size:2;transition-property:all;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms;scroll-behavior:smooth;caret-color:rgba(0,0,0,0)}::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-thumb{height:40px;background-color:#999}::-webkit-scrollbar-track-piece{background:#222}::selection{background:rgba(0,149,255,.1)}`}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
