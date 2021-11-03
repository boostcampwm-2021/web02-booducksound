import styled from '@emotion/styled';

interface ButtonContainerProps {
  width?: string;
  height?: string;
  background?: string;
  fontSize?: string;
  paddingH?: string;
}

const ButtonContainer = styled.button<ButtonContainerProps>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  background: ${({ background }) => background || 'inherit'};

  font-size: ${({ fontSize }) => fontSize || 'inherit'};
  padding: ${({ paddingH }) => paddingH || '6%'} 0;

  font-family: ${({ theme }) => theme.fonts.gmarket};
  border-radius: 60px;
  border: 2px solid ${({ theme }) => theme.colors.black};
  box-shadow: 4px 1px 0 ${({ theme }) => theme.colors.black};
  cursor: pointer;

  white-space: nowrap;

  &:hover {
    filter: brightness(0.9);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    border: 1px solid ${({ theme }) => theme.colors.black};
    box-shadow: 3px 1px 0 ${({ theme }) => theme.colors.black};
  }
`;

interface Props {
  width?: string;
  height?: string;
  background?: string;
  fontSize?: string;
  paddingH?: string;
  content: string;
}

const Button = ({ width, height, background, fontSize, paddingH, content }: Props) => {
  return (
    <ButtonContainer width={width} height={height} background={background} fontSize={fontSize} paddingH={paddingH}>
      {content}
    </ButtonContainer>
  );
};

export default Button;
