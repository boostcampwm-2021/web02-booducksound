import { render } from '@testing-library/react';

import Radio from './index';

describe('render test', () => {
  it('matches snapshot', () => {
    const RadioBtn = render(<Radio name="test" isChecked={true} />);
    expect(RadioBtn.container).toMatchSnapshot();
  });
});
