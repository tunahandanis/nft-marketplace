import "../styles/globals.scss"
import type { AppProps } from "next/app"
import "antd/dist/antd.css"
import Head from "next/head"
import Header from "components/Header"
import { AccountContextProvider } from "contexts/accountContext"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AccountContextProvider>
      <Head>
        <title>AiArtNFT | Generate artwork through AI, secure it as NFT</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/logo.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/logo.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/logo.png"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
    </AccountContextProvider>
  )
}
