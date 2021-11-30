import { KeyboardEventHandler } from 'react';

import styled from '@emotion/styled';

import { InputTextProps } from '~/types/InputTextProps';

type ContainerProps = {
  isSearch: boolean;
};

const Container = styled.input<ContainerProps>`
  border: 2px solid black;
  border-radius: 100px;
  outline: none;
  background-image: ${({ isSearch }) => (isSearch ? "url('/images/readingGlass.png')" : '')};
  background-repeat: no-repeat;
  background-position: left;
`;

const InputText = ({ type = 'text', handleKeyDown, handleChange, handleEnter, ...props }: InputTextProps) => {
  const handlePressEnter: KeyboardEventHandler = (e) => {
    if (!handleEnter) return;
    if (e.key !== 'Enter') return;
    handleEnter();
  };

  return (
    <Container
      type={type}
      onKeyDown={handleKeyDown}
      onKeyUp={handlePressEnter}
      onChange={handleChange}
      {...props}
    ></Container>
  );
};

export default InputText;
