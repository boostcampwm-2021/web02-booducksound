import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

interface ChipContainerProps {
  color: string;
  fontSize: string;
}
interface DeleteButtonProps {
  color: string;
  marginRight: string;
}
interface Props {
  color: string;
  fontSize: string;
  content: string;
}

const ChipContainer = styled.div<ChipContainerProps>`
  display: inline;

  text-align: center;
  border: 2px ${({ color }) => color} solid;
  border-radius: 5px;

  font-size: ${({ fontSize }) => fontSize};
  font-weight: bold;
  color: ${({ color }) => color};
  padding-left: ${({ fontSize }) => fontSize};
  padding-right: ${({ fontSize }) => fontSize};
`;
const DeleteButton = styled.button<DeleteButtonProps>`
  color: ${({ color }) => color};
  font-size: inherit;
  background-color: transparent;
  border: none;
  margin-right: ${({ marginRight }) => marginRight};
  cursor: pointer;
`;

const Chip = ({ color, fontSize, content }: PropsWithChildren<Props>) => {
  return (
    <ChipContainer color={color} fontSize={fontSize}>
      <DeleteButton color={color} marginRight={fontSize}>
        x
      </DeleteButton>
      {content}
    </ChipContainer>
  );
};

export default Chip;
