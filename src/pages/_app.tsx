import "../styles/globals.scss";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import Header from "components/Header";
import { AccountContextProvider } from "contexts/accountContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AccountContextProvider>
      <Header />
      <Component {...pageProps} />
    </AccountContextProvider>
  );
}
