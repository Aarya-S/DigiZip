import '../styles/globals.css'
import '../styles/index.css';
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import dynamic from 'next/dynamic';

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
