import { ThemeProvider } from '@emotion/react';
import type { NextPage } from 'next';

import theme from '../styles/theme';

const Home: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <div></div>
    </ThemeProvider>
  );
};

export default Home;
