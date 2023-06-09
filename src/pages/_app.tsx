import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';

const fontMontserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${fontMontserrat.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
