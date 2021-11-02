import { render } from '@testing-library/react';

import theme from '../../../styles/theme';

import RadioBtn from '.';

describe('render test', () => {
  it('matches snapshot', () => {
    const radioBtn = render(<radioBtn />);
    expect(radioBtn.container).toMatchSnapshot();
  });
});
