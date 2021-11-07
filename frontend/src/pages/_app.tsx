import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { CookiesProvider, Cookies } from 'react-cookie';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import theme from '../styles/theme';

import '../styles/default.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const MyApp = ({ Component, pageProps }: AppProps) => {
  //console.log(new Cookies().get('token'));
  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </CookiesProvider>
  );
};

export default MyApp;
