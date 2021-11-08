import { ThemeProvider } from '@emotion/react';
import reducers from '@reducer/index';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import theme from '../styles/theme';

import '@styles/default.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
};

export default MyApp;
