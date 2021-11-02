import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

interface InputBoxContainerProps {
  width: number;
  height: number;
}
interface TextInputContainerProps {
  height: number;
  fontSize: number;
}
interface ImageContainerProps {
  rightMargin: number;
}
interface Props {
  isSearch: boolean;
  placeholder: string;
  width: number;
  height: number;
  fontSize: number;
}

const InputBoxContainer = styled.div<InputBoxContainerProps>`
  border: 2px solid black;
  border-radius: 100px;
  width: ${({ width }) => width}px;
  padding: ${({ height }) => height / 1.5}px ${({ height }) => height / 1.5}px;
  padding-left: ${({ height }) => height}px;
  padding-right: ${({ height }) => height}px;
  text-align: center;
  margin-top: 50px;
  display: flex;
  box-shadow: 2px 2px 10px gray;
  background-color: white;
`;
const TextInputContainer = styled.input<TextInputContainerProps>`
  display: inline-block;
  width: 100%;
  outline: none;
  border: none;
  font-size: ${({ fontSize }) => fontSize}px;
`;

const ImageContainer = styled.div<ImageContainerProps>`
  display: inline-block;
  width: 64px;
  margin-right: ${({ rightMargin }) => rightMargin}px;
`;

const ReadingGlass = styled.img`
  height: 100%;
  user-select: none;
`;

const InputBox = ({ isSearch, placeholder, width, height, fontSize }: PropsWithChildren<Props>) => {
  return (
    <InputBoxContainer width={width} height={height}>
      {isSearch ? (
        <ImageContainer rightMargin={height}>
          <ReadingGlass src="/images/readingGlass.png" draggable="false"></ReadingGlass>
        </ImageContainer>
      ) : null}
      <TextInputContainer placeholder={placeholder} height={height} fontSize={fontSize}></TextInputContainer>
    </InputBoxContainer>
  );
};

export default InputBox;
