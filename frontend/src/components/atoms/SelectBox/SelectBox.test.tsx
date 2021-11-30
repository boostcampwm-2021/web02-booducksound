import { render } from '@testing-library/react';

import SelectBox from '.';

describe('SelectBox', () => {
  it('matches snapshot', () => {
    const select = render(
      <SelectBox options={['first', 'second', 'third']} onChange={() => {}} values={[1, 2, 3, 4, 5, 6, 7, 8]} />,
    );
    expect(select.container).toMatchSnapshot();
  });
});
