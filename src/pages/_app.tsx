import { FlightsProvider } from '@/providers/FlightsProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FlightsProvider>
      <Component {...pageProps} />
    </FlightsProvider>
  );
}
