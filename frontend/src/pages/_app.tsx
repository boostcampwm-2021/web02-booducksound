import { useEffect } from 'react';

import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { Provider, useDispatch } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { getUser } from '~/actions/user';
import { handleLoginUser } from '~/api/account';
import rootReducer from '~/reducers/index';
import theme from '~/styles/theme';

import '~/styles/default.css';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

const Authenticator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    handleLoginUser();
  }, []);

  return <></>;
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Authenticator />
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
};

export default MyApp;
