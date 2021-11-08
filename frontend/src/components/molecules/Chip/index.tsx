import { MouseEventHandler, PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import theme from '../../../styles/theme';
import DeleteButton from '../../atoms/DeleteButton';

interface Props {
  deleteHandler: MouseEventHandler;
}

const ChipContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  border: 2px ${theme.colors.soda} solid;
  border-radius: 5px;

  font-size: 0.8em;
  font-weight: bold;
  color: ${theme.colors.soda};
  padding: 3px 15px 3px 4px;
`;

const Chip = ({ children, deleteHandler }: PropsWithChildren<Props>) => {
  return (
    <ChipContainer>
      <DeleteButton clickHandler={deleteHandler} />
      <span>{children}</span>
    </ChipContainer>
  );
};

export default Chip;
