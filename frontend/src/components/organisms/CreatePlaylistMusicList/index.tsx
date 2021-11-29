import { DragEventHandler, PropsWithChildren, useState } from 'react';

import styled from '@emotion/styled';

import Button from '~/atoms/Button';
import CreatePlaylistMusicItem from '~/molecules/CreatePlaylistMusicItem';
import theme from '~/styles/theme';
import { Music } from '~/types/Music';
import { PlaylistInput } from '~/types/PlaylistInput';
import { swap } from '~/utils/swap';

interface Props {
  musics: Music[];
  setModalOption: Function;
  setPlaylist: Function;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    column-gap: 30px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    column-gap: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    column-gap: 10px;
  }
`;

const MusicListTitleBottom = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 30px;
`;

const MusicListTitle = styled.h1`
  font-weight: bold;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 15px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 20px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
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

const CreatePlaylistMusicList = ({ musics, setModalOption, setPlaylist }: PropsWithChildren<Props>) => {
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
    setPlaylist((prevState: PlaylistInput) => {
      const nextMusics = swap<Music>(grabPosition, targetPosition, [...prevState.musics]);
      return { ...prevState, musics: nextMusics };
    });
  };

  const handleDragEnd: DragEventHandler = (e) => {
    (e.target as HTMLElement).classList.remove('grabbing');
    e.dataTransfer.dropEffect = 'move';
  };

  const deleteMusic = (target: number) =>
    setPlaylist((prevState: PlaylistInput) => {
      return {
        ...prevState,
        musics: [...prevState.musics.filter((music, idx) => idx !== target)],
      };
    });

  return (
    <MusicListContainer>
      <MusicListTitleBox>
        <MusicListTitleTop>
          <MusicListTitle>노래 목록</MusicListTitle>
          <Button
            background={theme.colors.mint}
            fontSize="12px"
            paddingH="7px"
            width="100px"
            onClick={(e) => setModalOption({ type: 'create', target: null })}
          >
            추가
          </Button>
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
              deleteItem={deleteMusic}
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
