import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(router.isReady);
  }, [router.isReady]);

  return <> {ready && <Component {...pageProps} />} </>;
}
