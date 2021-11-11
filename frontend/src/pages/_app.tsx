import { useEffect } from 'react';

import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { getUser } from '~/actions/user';
import { updateStoreData } from '~/api/account';
import rootReducer from '~/reducers/index';
import { UserState } from '~/reducers/user';
import theme from '~/styles/theme';

import '~/styles/default.css';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const dispatch = store.dispatch as ThunkDispatch<UserState, void, Action>;

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    updateStoreData(() => dispatch(getUser()));
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Component dispatch={dispatch} {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
};

export default MyApp;
