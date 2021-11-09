import { useEffect } from 'react';

import Router from 'next/router';

export const useLeavePage = (callback: { (...argv: any): void }) => {
  useEffect(() => {
    Router.events.on('routeChangeStart', callback);
    return () => {
      Router.events.off('routeChangeStart', callback);
    };
  }, []);
};
