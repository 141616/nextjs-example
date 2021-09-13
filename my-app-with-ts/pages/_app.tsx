import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StoreProvider } from "../components/StoreProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider {...pageProps}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
