export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className='font-sans content py-6 text-center text-sm text-neutral-500 dark:text-neutral-400 space-x-5 transition-all'>
      <a href={'https://github.com/Bibooo25730'}><i className="nes-icon github is-small"></i></a>
      <span>© {year} {process.env.name}</span>
      <a className="inline-block" href={"http://mkd.bibooo.cn/"}> <i className="nes-icon snes is-snes"></i></a>
    </footer>
  )
}
