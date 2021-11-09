import { DragEventHandler, PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import Button from '~/atoms/Button';
import theme from '~/styles/theme';

interface DragHandlers {
  handleDragOver: DragEventHandler;
  handleDragStart: DragEventHandler;
  handleDrop: DragEventHandler;
  handleDragEnd: DragEventHandler;
}
interface Props {
  idx: number;
  title: string;
  deleteItem: Function;
  modifyItem: Function;
  dragHandlers: DragHandlers;
}

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px 10px 5px;
  border-bottom: 2px solid #eee;
  width: 100%;
  cursor: grab;
  :hover {
    background-color: #eee;
  }
`;
const MusicTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const CreatePlaylistMusicItem = ({ idx, title, deleteItem, modifyItem, dragHandlers }: PropsWithChildren<Props>) => {
  const { handleDragOver, handleDragStart, handleDrop, handleDragEnd } = dragHandlers;
  return (
    <ItemContainer
      draggable
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      data-position={idx}
    >
      <MusicTitle>{title}</MusicTitle>
      <ButtonBox>
        <Button
          content="수정"
          background={theme.colors.sky}
          fontSize="12px"
          paddingH="7px"
          width="100px"
          onClick={(e) => modifyItem()}
        />
        <Button
          content="삭제"
          background={theme.colors.peach}
          fontSize="12px"
          paddingH="7px"
          width="100px"
          onClick={(e) => deleteItem(idx)}
        />
      </ButtonBox>
    </ItemContainer>
  );
};

export default CreatePlaylistMusicItem;
