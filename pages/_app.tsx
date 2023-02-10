import '../styles/globals.css'
import '../styles/index.css';
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
  <Navbar />
  <Component {...pageProps} />
  <Footer />
  </>
  )
}
