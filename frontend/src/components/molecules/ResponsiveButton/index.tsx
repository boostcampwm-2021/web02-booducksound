import { MouseEventHandler } from 'react';

import styled from '@emotion/styled';

import Button from '~/atoms/Button';

interface ButtonWrapperProps {
  width: string;
  fontSize: string;
  smWidth?: string;
  smFontSize?: string;
  mdWidth?: string;
  mdFontSize?: string;
  lgWidth?: string;
  lgFontSize?: string;
  onClick?: MouseEventHandler;
}

interface ResponsiveButtonProps extends ButtonWrapperProps {
  background: string;
  content: string;
  height?: string;
  paddingH?: string;
  disabled?: boolean;
}

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  width: ${({ width }) => width};
  font-size: ${({ fontSize }) => fontSize};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    ${({ lgWidth }) => lgWidth && `width: ${lgWidth};`}
    ${({ lgFontSize }) => lgFontSize && `font-size: ${lgFontSize};`}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ mdWidth }) => mdWidth && `width: ${mdWidth};`}
    ${({ mdFontSize }) => mdFontSize && `font-size: ${mdFontSize};`}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${({ smWidth }) => smWidth && `width: ${smWidth};`}
    ${({ smFontSize }) => smFontSize && `font-size: ${smFontSize};`}
  }
`;

const ResponsiveButton = (props: ResponsiveButtonProps) => {
  const { content, background, height, paddingH, disabled } = props;

  return (
    <ButtonWrapper {...props}>
      <Button content={content} background={background} height={height} paddingH={paddingH} disabled={disabled} />
    </ButtonWrapper>
  );
};

export default ResponsiveButton;
