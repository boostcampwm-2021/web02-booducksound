import { ThemeProvider } from '@emotion/react';
import { render } from '@testing-library/react';

import theme from '~/styles/theme';

import PageBox from '.';

describe('render test', () => {
  it('matches snapshot', () => {
    const pageBox = render(
      <ThemeProvider theme={theme}>
        <PageBox />
      </ThemeProvider>,
    );
    expect(pageBox.container).toMatchSnapshot();
  });
});
