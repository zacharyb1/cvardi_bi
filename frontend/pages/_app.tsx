import type { AppProps } from "next/app";
import { ImageProvider } from '../data/images';
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ImageProvider>
      <Component {...pageProps} />
    </ImageProvider>
  );
}
