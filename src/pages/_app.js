import '../styles/base.css';
import '../styles/global.css';
import { Provider } from "react-redux";
import { stroe } from "../store/store";
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }) {
  return (
  <Provider store={stroe}>  <ThemeProvider attribute='class' disableTransitionOnChange>
      <Component {...pageProps} />
    </ThemeProvider></Provider>
  )
}
