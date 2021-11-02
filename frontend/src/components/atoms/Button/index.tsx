import styled from '@emotion/styled';

interface ButtonContainerProps {
  width?: number;
  background: string;
  fontSize?: number;
}

const ButtonContainer = styled.button<ButtonContainerProps>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  background: ${({ background }) => background};

  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : 'inherit')};
  padding: 6% 0;

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
  width?: number;
  background: string;
  fontSize?: number;
  content: string;
}

const Button = ({ width, background, fontSize, content }: Props) => {
  return (
    <ButtonContainer width={width} background={background} fontSize={fontSize}>
      {content}
    </ButtonContainer>
  );
};

export default Button;
