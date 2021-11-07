import { ChangeEventHandler, KeyboardEventHandler } from 'react';

import styled from '@emotion/styled';

interface Props {
  isSearch: boolean;
  placeholder: string;
  className: string;
  value: string;
  enterHandler?: KeyboardEventHandler;
  changeHandler: ChangeEventHandler;
}
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

const InputText = ({ isSearch, placeholder, className, value, enterHandler, changeHandler }: Props) => {
  return (
    <Container
      className={className}
      isSearch={isSearch}
      type="text"
      placeholder={placeholder}
      value={value}
      onKeyUp={enterHandler}
      onChange={changeHandler}
    ></Container>
  );
};

export default InputText;
