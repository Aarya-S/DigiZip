import '../styles/globals.css'
import '../styles/index.css';
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import dynamic from 'next/dynamic'
// import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
const NavBar = dynamic(() => import('../components/Navbar/Navbar'), {ssr: false});
export default function App({ Component, pageProps }: AppProps) {
  return (
  
  <NextUIProvider>
    <NavBar />
    <Component {...pageProps} />
    <Footer />
  </NextUIProvider>
  
  )
}
