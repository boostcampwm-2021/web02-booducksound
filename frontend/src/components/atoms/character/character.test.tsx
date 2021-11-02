import React from 'react';
import { render, screen } from '@testing-library/react';
import Character from './index';

describe('케릭터', () => {
  it('캐릭터 렌더링', () => {
    const result = render(<Character color="ffff" width={200} />);
    // expect(result).toMatchInlineSnapshot();
  });
});
