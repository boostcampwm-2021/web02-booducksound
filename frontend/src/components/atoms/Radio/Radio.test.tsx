import { render } from '@testing-library/react';

describe('render test', () => {
  it('matches snapshot', () => {
    const radioBtn = render(<radioBtn />);
    expect(radioBtn.container).toMatchSnapshot();
  });
});
