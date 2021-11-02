import type { AppProps } from 'next/app';
import '../styles/default.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
