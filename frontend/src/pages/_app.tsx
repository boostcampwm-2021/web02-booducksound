import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';

import theme from '../styles/theme';

import '../styles/default.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
