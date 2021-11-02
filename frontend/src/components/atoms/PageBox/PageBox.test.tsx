import { render } from '@testing-library/react';

import PageBox from '.';

describe('render test', () => {
  it('matches snapshot', () => {
    const pageBox = render(<PageBox />);
    expect(pageBox.container).toMatchSnapshot();
  });
});
