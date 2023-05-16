import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { initFirebase } from "@/config/firebaseApp";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    initFirebase();
  }, []);

  return <Component {...pageProps} />
}
