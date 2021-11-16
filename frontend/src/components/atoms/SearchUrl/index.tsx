import { useState } from 'react';

import styled from '@emotion/styled';

import InputTextProps from '~/types/InputTextProps';

interface ContainerProps {
  isSearch: boolean;
}

const Container = styled.input<ContainerProps>`
  border: 2px solid black;
  border-radius: 100px;
  outline: none;
  background-image: ${({ isSearch }) => (isSearch ? "url('/images/readingGlass.png')" : '')};
  background-repeat: no-repeat;
  background-position: left;
`;

const InputText = ({ type = 'text', handleKeyDown, handleChange, handleEnter, ...props }: InputTextProps) => {
  const [enter, setEnter] = useState<boolean>(false);
  const pressEnterHandle = () => {
    setEnter(true);
  };
  return (
    <Container
      type={type}
      onKeyDown={handleKeyDown}
      onKeyUp={pressEnterHandle}
      onChange={handleChange}
      {...props}
    ></Container>
  );
};

export default InputText;
