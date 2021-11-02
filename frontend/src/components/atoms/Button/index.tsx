import styled from '@emotion/styled';

interface ButtonContainerProps {
  width?: number;
  background: string;
  fontSize: number;
}

const ButtonContainer = styled.button<ButtonContainerProps>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  background: ${({ background }) => background};

  font-size: ${({ fontSize }) => fontSize}px;
  padding-top: ${({ fontSize }) => fontSize / 2}px;
  padding-bottom: ${({ fontSize }) => fontSize / 2}px;

  font-family: ${({ theme }) => theme.fonts.gmarket};
  border-radius: 60px;
  border: 2px solid #000;
  box-shadow: 4px 1px 0 #000;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;

interface Props {
  width?: number;
  background: string;
  fontSize: number;
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
