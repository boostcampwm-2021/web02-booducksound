import { useEffect } from 'react';

import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { handleLoginUser } from '../actions/account';
import reducers from '../reducers';
import theme from '../styles/theme';

import '../styles/default.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    handleLoginUser();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
};

export default MyApp;
