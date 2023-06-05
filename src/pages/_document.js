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
        <link rel="alternate" type="application/rss+xml" title="" href="/feed.xml" />
        <link type='text/css' rel='stylesheet' charSet='utf-8' href='https://www.gstatic.com/_/translate_http/_/ss/k=translate_http.tr.69JJaQ5G5xA.L.W.O/d=0/rs=AN8SPfpC36MIoWPngdVwZ4RUzeJYZaC7rg/m=el_main_css'></link>
        <style>{`:root{--color-font:#222;--color-background-color:#fff}@media screen and (prefers-color-scheme:dark){:root:not(.light){--color-font:hsla(0,0%,100%,.87);--color-background-color:#121212}}.dark{--color-font:hsla(0,0%,100%,.87);--color-background-color:#121212}body,html{color:var(--color-font);font-family:zpix, sans-serif;background-color:var(--color-background);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;-moz-tab-size:2;tab-size:2;transition-property:all;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms;scroll-behavior:smooth;}::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-thumb{height:40px;background-color:#999}::-webkit-scrollbar-track-piece{background:#222}::selection{background:rgba(0,149,255,.1)}`}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}