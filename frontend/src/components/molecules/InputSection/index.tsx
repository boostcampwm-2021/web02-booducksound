import { ChangeEventHandler, PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import InputBox from '../../atoms/InputBox';

interface Props {
  id: string;
  title: string;
  isSearch: boolean;
  placeholder: string;
  width: string;
  height: string;
  fontSize: string;
  titleSize: string;
  margin: string;
  paddingW?: string;
  disabled?: boolean;
  onChangeHandler?: ChangeEventHandler;
}
interface InputLabelContainerProps {
  titleSize: string;
  margin: string;
}

const InputSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const InputLabelContainer = styled.label<InputLabelContainerProps>`
  font-size: ${({ titleSize }) => titleSize};
  margin-bottom: ${({ margin }) => margin};
  font-weight: 700;
`;

const InputSection = ({
  id,
  title,
  titleSize,
  isSearch,
  placeholder,
  width,
  height,
  fontSize,
  margin,
  paddingW,
  disabled,
  onChangeHandler,
}: PropsWithChildren<Props>) => {
  return (
    <InputSectionContainer>
      <InputLabelContainer titleSize={titleSize} htmlFor={id} margin={margin}>
        {title}
      </InputLabelContainer>
      <InputBox
        isSearch={isSearch}
        placeholder={placeholder}
        width={width}
        height={height}
        fontSize={fontSize}
        paddingW={paddingW}
        disabled={disabled}
        onChangeHandler={onChangeHandler}
      ></InputBox>
    </InputSectionContainer>
  );
};

export default InputSection;
