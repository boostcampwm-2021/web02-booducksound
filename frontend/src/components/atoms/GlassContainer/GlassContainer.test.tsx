import { render } from '@testing-library/react';

import GlassContainer from './index';

describe('케릭터', () => {
  it('캐릭터 렌더링', () => {
    const result = render(<GlassContainer />);
    // expect(result).toMatchInlineSnapshot();
  });
});
