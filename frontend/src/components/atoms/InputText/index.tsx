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

const InputText = ({ type = 'text', handleChange, handleEnter, ...props }: InputTextProps) => (
  <Container type={type} onKeyUp={handleEnter} onChange={handleChange} {...props}></Container>
);

export default InputText;
