import { Theme } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      sky: string;
      lime: string;
      lightgray: string;
      peach: string;
      sand: string;
      night: string;
      lilac: string;
      ocean: string;
      deepblue: string;
      deepgray: string;
      gray: string;
      yellow: string;
      plum: string;
      orange: string;
      mint: string;
      soda: string;
    };
    fonts: {
      gmarket: string;
      kopub: string;
    };
  }
}

const theme: Theme = {
  colors: {
    sky: '#C3E3F1',
    lime: '#DDECCA',
    lightgray: '#EEEEEE',
    peach: '#FECCBE',
    sand: '#FEEBB6',
    night: '#324156',
    lilac: '#C2C8E4',
    ocean: '#1187CF',
    deepblue: '#3A4CA8',
    deepgray: '#9E9EA7',
    gray: '#B7B9B9',
    yellow: '#FFCD4A',
    plum: '#FFA177',
    orange: '#FD8A69',
    mint: '#B8E6E1',
    soda: '#58CCFF',
  },
  fonts: {
    gmarket: 'GmarketSansMedium',
    kopub: 'KoPubDotumMedium',
  },
};

export default theme;
