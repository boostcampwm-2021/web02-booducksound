import { DragEventHandler, PropsWithChildren, useState } from 'react';

import styled from '@emotion/styled';

import Button from '~/atoms/Button';
import CreatePlaylistMusicItem from '~/molecules/CreatePlaylistMusicItem';
import theme from '~/styles/theme';
import { Music } from '~/types/Music';
import { swap } from '~/utils/swap';

interface Props {
  musics: Music[];
  setModalOption: Function;
  setMusics: Function;
}

const MusicListContainer = styled.div``;
const MusicListTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  border-bottom: 2px solid #eee;
`;
const MusicListContentBox = styled.div`
  height: 350px;
  border-bottom: 2px solid #eee;
  overflow-y: auto;
  :not(:hover) {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
const MusicListTitleTop = styled.div`
  display: flex;
  align-items: center;
  column-gap: 30px;
  @media (max-width: 1200px) {
    column-gap: 30px;
  }
  @media (max-width: 768px) {
    column-gap: 20px;
  }
  @media (max-width: 480px) {
    column-gap: 10px;
  }
`;
const MusicListTitleBottom = styled.div`
  color: ${theme.colors.gray};
  margin-bottom: 30px;
`;
const MusicListTitle = styled.h1`
  font-weight: bold;
  @media (min-width: 480px) {
    font-size: 15px;
  }
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1200px) {
    font-size: 25px;
  }
`;
const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #ddd;
`;
const CreatePlaylistMusicList = ({ musics, setModalOption, setMusics }: PropsWithChildren<Props>) => {
  const [grab, setGrab] = useState<EventTarget>();

  const handleDragOver: DragEventHandler = (e) => {
    e.preventDefault();
  };
  const handleDragStart: DragEventHandler = (e) => {
    setGrab(e.target);
    (e.target as HTMLElement).classList.add('grabbing');
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDrop: DragEventHandler = (e) => {
    const grabPosition = Number((grab as HTMLElement).dataset.position);
    const targetPosition = Number((e.target as HTMLElement).dataset.position);

    setMusics((preState: Music[]) => swap<Music>(grabPosition, targetPosition, [...preState]));
  };
  const handleDragEnd: DragEventHandler = (e) => {
    (e.target as HTMLElement).classList.remove('grabbing');
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <MusicListContainer>
      <MusicListTitleBox>
        <MusicListTitleTop>
          <MusicListTitle>노래 목록</MusicListTitle>
          <Button
            content="추가"
            background={theme.colors.mint}
            fontSize="12px"
            paddingH="7px"
            width="100px"
            onClick={(e) => setModalOption({ type: 'create', target: null })}
          ></Button>
        </MusicListTitleTop>
        <MusicListTitleBottom>최소 3개, 최대 50개까지 추가가 가능합니다.</MusicListTitleBottom>
      </MusicListTitleBox>
      <MusicListContentBox>
        {!musics.length ? (
          <EmptyBox>노래를 추가해 주세요.</EmptyBox>
        ) : (
          musics.map((music, idx) => (
            <CreatePlaylistMusicItem
              title={music.info}
              key={idx}
              idx={idx}
              deleteItem={(target: number) =>
                setMusics((preState: Music[]) => [...preState.filter((music, idx) => idx !== target)])
              }
              modifyItem={() => setModalOption({ type: 'modify', target: idx })}
              dragHandlers={{
                handleDragOver,
                handleDragStart,
                handleDrop,
                handleDragEnd,
              }}
            />
          ))
        )}
      </MusicListContentBox>
    </MusicListContainer>
  );
};

export default CreatePlaylistMusicList;
