import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';

import theme from '../../../styles/theme';

import Button from '.';

describe('버튼 렌더링 테스트', () => {
  const content = '로그인';
  const background = theme.colors.sky;
  const fontSize = 16;

  render(
    <ThemeProvider theme={theme}>
      <Button background={background} fontSize={fontSize} content={content} />
    </ThemeProvider>,
  );

  const button = screen.getByText(content);

  it('글자 렌더링', () => {
    expect(button).toBeInTheDocument();
  });

  it('백그라운드', () => {
    expect(button).toHaveStyle(`background: ${background}`);
  });

  it('폰트 사이즈', () => {
    expect(button).toHaveStyle(`font-size: ${fontSize}px`);
  });
});
