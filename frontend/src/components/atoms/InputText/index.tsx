import { ChangeEventHandler, KeyboardEventHandler } from 'react';

import styled from '@emotion/styled';

interface Props {
  isSearch: boolean;
  placeholder: string;
  className: string;
  value: string;
  onKeyUp?: KeyboardEventHandler;
  onChange: ChangeEventHandler;
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

const InputText = ({ ...props }: Props) => {
  return <Container type="text" {...props}></Container>;
};

export default InputText;
