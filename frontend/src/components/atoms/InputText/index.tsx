import { ChangeEventHandler, KeyboardEventHandler } from 'react';

import styled from '@emotion/styled';

interface Props {
  isSearch: boolean;
  placeholder: string;
  className: string;
  value: string;
  handleEnter?: KeyboardEventHandler;
  handleChange: ChangeEventHandler;
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

const InputText = ({ handleChange, handleEnter, ...props }: Props) => (
  <Container type="text" onKeyUp={handleEnter} onChange={handleChange} {...props}></Container>
);

export default InputText;
