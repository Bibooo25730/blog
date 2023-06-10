import Nav from "./nav";
import Footer from "./footer";

export default function Layout({ children, home }) {
  return (
    <>
      <header  className='font-sans backdrop-blur z-50 bg-white/60 dark:bg-[#121212]/60 text-center transition-all'>
        {home &&(
        <div className='py-6 transition-all space-y-2'>
          <h2 style={{"fontSize":"var(--step-5)"}} className='text-6xl'>
            {process.env.name}
          </h2>
        </div>
        )}
      </header>
      <Nav />
      <main className='font-sans max-w-3xl mx-auto block p-6'>{children}</main>
      <a className='font-sans layout fixed bottom-10 right-4  p-4 block  z-50  dark:bg-[#121212]/60  hover:border-blue-600 hover:dark:border-blue-500 transition-all' href='#'><button type="button" className="nes-btn is-error">↑</button></a>
      <Footer />
    </>
  )
}
