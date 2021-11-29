import { MouseEventHandler } from 'react';

import styled from '@emotion/styled';

const Container = styled.button`
  background-image: url('/images/ic_delete.svg');
  width: 16px;
  height: 16px;
  font-size: inherit;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

interface Props {
  clickHandler: MouseEventHandler;
}

const DeleteButton = ({ clickHandler }: Props) => {
  return <Container onClick={clickHandler}></Container>;
};

export default DeleteButton;
