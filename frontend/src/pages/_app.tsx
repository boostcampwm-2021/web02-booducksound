import { useEffect } from 'react';

import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { createStore, applyMiddleware, compose, Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { getUser } from '~/actions/user';
import rootReducer from '~/reducers/index';
import { UserState } from '~/reducers/user';
import theme from '~/styles/theme';

import '~/styles/default.css';
import 'react-toastify/dist/ReactToastify.css';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const dispatch = store.dispatch as ThunkDispatch<UserState, void, Action>;

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Head>
          <title>BooduckSound</title>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="keywords" content="온라인,음악게임,노래맞추기,부덕사운드,booducksound,네이버,부스트캠프" />
          <meta name="description" content="🐥온라인 노래 맞히기 게임 플랫폼 부덕사운드 입니다.🐥" />
          <meta name="naver-site-verification" content="bf0aa56a1eb42c038834ca4aafb118b5d8bf15af" />
          <meta name="google-site-verification" content="QL6xJnBIBwJARnRjGuBW1uDQS98EJZFiFUkfUAxJm54" />
          <link rel="short icon" href="images/favicon.ico" />
        </Head>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  );
};

export default MyApp;
