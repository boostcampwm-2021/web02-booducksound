import { useEffect } from 'react';

import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { Provider, useDispatch } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { getUser } from '~/actions/user';
import { handleLoginUser } from '~/api/account';
import reducers from '~/reducers/index';
import theme from '~/styles/theme';

import '~/styles/default.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
};

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    handleLoginUser();
  });
  return <></>;
};

export default MyApp;
