import { MouseEventHandler, PropsWithChildren } from 'react';

import styled from '@emotion/styled';

type ButtonContainerProps = {
  width?: string;
  height?: string;
  background?: string;
  fontSize?: string;
  paddingH?: string;
};

const ButtonContainer = styled.button<ButtonContainerProps>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  background: ${({ background }) => background || 'inherit'};
  font-size: ${({ fontSize }) => fontSize || 'inherit'};
  padding: ${({ paddingH }) => paddingH || '5%'} 0;
  font-family: ${({ theme }) => theme.fonts.gmarket};
  border-radius: 60px;
  border: 2px solid ${({ theme }) => theme.colors.black};
  box-shadow: 4px 1px 0 ${({ theme }) => theme.colors.black};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    filter: brightness(0.9);
  }

  &:disabled {
    filter: none;
    cursor: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    border: 1px solid ${({ theme }) => theme.colors.black};
    box-shadow: 3px 1px 0 ${({ theme }) => theme.colors.black};
  }
`;

type Props = {
  width?: string;
  height?: string;
  background?: string;
  fontSize?: string;
  paddingH?: string;
  onClick?: MouseEventHandler;
  disabled?: boolean;
};

const Button = ({
  width,
  height,
  background,
  fontSize,
  paddingH,
  children,
  onClick,
  disabled,
}: PropsWithChildren<Props>) => {
  return (
    <ButtonContainer
      width={width}
      height={height}
      background={background}
      fontSize={fontSize}
      paddingH={paddingH}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;
