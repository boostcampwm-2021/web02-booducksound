import { MouseEventHandler, PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import Button from '~/atoms/Button';

type ButtonWrapperProps = {
  width: string;
  fontSize: string;
  height?: string;
  smWidth?: string;
  smHeight?: string;
  smFontSize?: string;
  mdWidth?: string;
  mdHeight?: string;
  mdFontSize?: string;
  lgWidth?: string;
  lgHeight?: string;
  lgFontSize?: string;
  onClick?: MouseEventHandler;
};

interface Props extends ButtonWrapperProps {
  background: string;
  paddingH?: string;
  disabled?: boolean;
}

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  width: ${({ width }) => width};
  font-size: ${({ fontSize }) => fontSize};
  height: ${({ height }) => height || 'auto'};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    ${({ lgWidth }) => lgWidth && `width: ${lgWidth};`}
    ${({ lgHeight }) => lgHeight && `height: ${lgHeight};`}
    ${({ lgFontSize }) => lgFontSize && `font-size: ${lgFontSize};`}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ mdWidth }) => mdWidth && `width: ${mdWidth};`}
    ${({ mdHeight }) => mdHeight && `height: ${mdHeight};`}
    ${({ mdFontSize }) => mdFontSize && `font-size: ${mdFontSize};`}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${({ smWidth }) => smWidth && `width: ${smWidth};`}
    ${({ smHeight }) => smHeight && `height: ${smHeight};`}
    ${({ smFontSize }) => smFontSize && `font-size: ${smFontSize};`}
  }
`;

const ResponsiveButton = (props: PropsWithChildren<Props>) => {
  const { children, background, paddingH, disabled } = props;

  return (
    <ButtonWrapper {...props}>
      <Button background={background} paddingH={paddingH} disabled={disabled} height="100%">
        {children}
      </Button>
    </ButtonWrapper>
  );
};

export default ResponsiveButton;
