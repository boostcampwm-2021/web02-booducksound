import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

interface ChipContainerProps {
  color: string;
  fontSize: number;
}
interface DeleteButtonProps {
  color: string;
  fontSize: number;
}
interface Props {
  color: string;
  fontSize: number;
  content: string;
}

const ChipContainer = styled.div<ChipContainerProps>`
  display: inline;

  text-align: center;
  border: 2px ${({ color }) => color} solid;
  border-radius: ${({ fontSize }) => fontSize / 5}px;

  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: bold;
  color: ${({ color }) => color};
  padding-left: ${({ fontSize }) => fontSize}px;
  padding-right: ${({ fontSize }) => fontSize}px;
`;
const DeleteButton = styled.button<DeleteButtonProps>`
  color: ${({ color }) => color};
  font-size: inherit;
  background-color: transparent;
  border: none;
  margin-right: ${({ fontSize }) => fontSize}px;
  cursor: pointer;
`;

const Chip = ({ color, fontSize, content }: PropsWithChildren<Props>) => {
  return (
    <ChipContainer color={color} fontSize={fontSize}>
      <DeleteButton color={color} fontSize={fontSize}>
        x
      </DeleteButton>
      {content}
    </ChipContainer>
  );
};

export default Chip;
