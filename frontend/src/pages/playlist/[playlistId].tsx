import { KeyboardEventHandler, MouseEvent, useState } from 'react';

import styled from '@emotion/styled';
import type { NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { createPlaylist, selectPlaylist, updatePlaylist } from '~/api/playlist';
import Button from '~/atoms/Button';
import MenuInfoBox from '~/atoms/MenuInfoBox';
import PageBox from '~/atoms/PageBox';
import { FAILED, SUCCESS } from '~/constants/index';
import Chip from '~/molecules/Chip';
import CreatePlaylistInputBox from '~/organisms/CreatePlaylistInputBox';
import CreatePlaylistMusicList from '~/organisms/CreatePlaylistMusicList';
import theme from '~/styles/theme';
import { Music } from '~/types/Music';
import { Playlist } from '~/types/Playlist';
import { PlaylistInput } from '~/types/PlaylistInput';

const CreatePlaylistMusicModal = dynamic(() => import('~/organisms/CreatePlaylistMusicModal'));

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
  margin-bottom: 40px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
const SubmitButtonWrapper = styled.div`
  display: inline;
  text-align: center;
`;
const Container = styled.div`
  @media (max-width: 1200px) {
    & > div > :last-child {
      padding: 70px;
      border-radius: 100px;
    }
  }
  @media (max-width: 768px) {
    & > div > :last-child {
      padding: 50px;
      border-radius: 80px;
    }
  }
  @media (max-width: 480px) {
    & > div > :last-child {
      padding: 40px;
      border-radius: 60px;
    }
  }
`;
const TARGET_INIT = 0;

interface ModalOption {
  type: 'close' | 'create' | 'modify';
  target: number;
}
interface Props {
  type: 'create' | 'update';
  content: PlaylistInput;
}

export const getServerSideProps = async ({ query }: NextPageContext) => {
  const { playlistId } = query;
  if (typeof playlistId !== 'string') return;
  if (playlistId === 'create') {
    return {
      props: {
        type: 'create',
        content: { playlistName: '', description: '', hashtag: '', hashtags: [], musics: [] },
      },
    };
  }
  const { playlist } = await selectPlaylist(playlistId);
  const { playlistName, description, hashtags, musics } = playlist;
  return {
    props: {
      type: 'update',
      content: { playlistName, description, hashtags, musics, hashtag: '' },
    },
  };
};

const PlaylistCreate: NextPage<Props> = ({ type, content }) => {
  const { playlistId } = useRouter().query;
  const userInfo = useSelector((state: any) => state.user);
  const [modalOption, setModalOption] = useState<ModalOption>({ type: 'close', target: TARGET_INIT });
  const [playlist, setPlaylistAll] = useState<PlaylistInput>({
    playlistName: content.playlistName,
    description: content.description,
    hashtag: content.hashtag,
    hashtags: content.hashtags,
    musics: content.musics,
  });

  const { playlistName, description, hashtag, hashtags, musics } = playlist;

  const setPlaylist = (newState: Object) =>
    setPlaylistAll((preState) => {
      return { ...preState, ...newState };
    });
  const checkAllValidInput = () => {
    if (!playlistName || !description || !hashtags.length) return false;
    if (musics.length < 3 || musics.length > 50) return false;
    return true;
  };
  const handleAddChipKeyDown: KeyboardEventHandler = (e) => {
    if (e.key !== ' ') return;
    e.preventDefault();
  };
  const handleAddChipKeyUp: KeyboardEventHandler = (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if (!hashtag.trim()) return;
    setPlaylist({ hashtag: '' });
    setPlaylistAll((preState: PlaylistInput) => {
      return { ...preState, hashtags: [...preState.hashtags, hashtag.replace(/\s/g, '')] };
    });
  };
  const handleSubmit = async () => {
    if (!checkAllValidInput()) {
      alert('입력을 확인해주세요.');
      return;
    }
    const result = await mapSubmitFunction({
      type,
      playlistId,
      playlist: { playlistName, description, musics, hashtags, userId: userInfo.id },
    });
    const { status } = result;
    if (status === FAILED) alert('플레이리스트 등록에 실패하였습니다.');
    if (status === SUCCESS) Router.back();
  };

  const mapSubmitFunction = async ({
    type,
    playlistId,
    playlist,
  }: {
    type: string;
    playlistId: string | string[] | undefined;
    playlist: Playlist;
  }) => {
    if (typeof playlistId !== 'string') return;
    if (type === 'create') {
      return await createPlaylist(playlist);
    } else if (type === 'update') {
      return await updatePlaylist(playlistId, playlist);
    }
  };
  const addMusics = (newMusic: Music) => {
    setPlaylistAll((preState: PlaylistInput) => {
      return { ...preState, musics: [...preState.musics, newMusic] };
    });
  };
  const updateMusics = (newMusic: Music) => {
    setPlaylistAll((preState: PlaylistInput) => {
      const nextMusics = [...preState.musics];
      nextMusics[modalOption.target] = newMusic;
      return { ...preState, musics: nextMusics };
    });
  };
  const deleteMusics = (idx: number) => (e: MouseEvent) => {
    setPlaylistAll((preState: PlaylistInput) => {
      const nextMusics = preState.hashtags.filter((hashtag, i) => i !== idx);
      return { ...preState, hashtags: [...nextMusics] };
    });
  };

  return (
    <Container>
      <MenuInfoBox name="플레이리스트 추가"></MenuInfoBox>
      <PageBox>
        <Wrapper>
          <CreatePlaylistInputBox
            setPlaylist={setPlaylist}
            handleAddChipKeyUp={handleAddChipKeyUp}
            handleAddChipKeyDown={handleAddChipKeyDown}
            playlistName={playlistName}
            description={description}
            hashtag={hashtag}
          />
          <ChipContainer>
            {hashtags.map((hashtag, idx) => (
              <Chip key={idx} deleteHandler={deleteMusics(idx)}>
                {hashtag}
              </Chip>
            ))}
          </ChipContainer>
          <CreatePlaylistMusicList
            musics={musics}
            setModalOption={setModalOption}
            setPlaylist={setPlaylistAll}
          ></CreatePlaylistMusicList>
          <SubmitButtonWrapper>
            <Button background={theme.colors.sky} fontSize="1.5em" paddingH="2%" width="45%" onClick={handleSubmit}>
              등록
            </Button>
          </SubmitButtonWrapper>
        </Wrapper>
      </PageBox>
      {modalOption.type === 'create' ? (
        <CreatePlaylistMusicModal setModalOption={setModalOption} setMusics={addMusics}></CreatePlaylistMusicModal>
      ) : modalOption.type === 'modify' ? (
        <CreatePlaylistMusicModal
          setModalOption={setModalOption}
          setMusics={updateMusics}
          musicInfo={musics[modalOption.target]}
        ></CreatePlaylistMusicModal>
      ) : null}
    </Container>
  );
};

export default PlaylistCreate;
