import { KeyboardEventHandler, MouseEvent, useState } from 'react';

import styled from '@emotion/styled';
import type { NextPage, NextPageContext } from 'next';
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
import CreatePlaylistMusicModal from '~/organisms/CreatePlaylistMusicModal';
import theme from '~/styles/theme';
import { Music } from '~/types/Music';
import { Playlist } from '~/types/Playlist';
import { PlaylistInput } from '~/types/PlaylistInput';

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
        content: {
          playlistName: '',
          description: '',
          hashTag: '',
          hashTags: [],
          musics: [],
        },
      },
    };
  }
  const { playlist } = await selectPlaylist(playlistId);
  const { playlistName, description, hashTags, musics } = playlist;
  return {
    props: {
      type: 'update',
      content: {
        playlistName,
        description,
        hashTags,
        musics,
        hashTag: '',
      },
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
    hashTag: content.hashTag,
    hashTags: content.hashTags,
    musics: content.musics,
  });
  const { playlistName, description, hashTag, hashTags, musics } = playlist;

  const setPlaylist = (newState: Object) =>
    setPlaylistAll((preState) => {
      return { ...preState, ...newState };
    });
  const checkAllValidInput = () => {
    if (!playlistName || !description || !hashTags.length) return false;
    if (musics.length < 3 || musics.length > 50) return false;
    return true;
  };
  const handleAddChip: KeyboardEventHandler = (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if (!hashTag) return;
    setPlaylist({ hashTag: '' });
    setPlaylistAll((preState: PlaylistInput) => {
      return { ...preState, hashTags: [...preState.hashTags, hashTag.trim()] };
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
      playlist: { playlistName, description, musics, hashTags, userId: userInfo.id },
    });
    const { status } = result;
    if (status === FAILED) {
      alert('플레이리스트 등록에 실패하였습니다.');
    } else if (status === SUCCESS) {
      Router.push('/lobby');
    }
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
      const nextMusics = preState.hashTags.filter((hashTag, i) => i !== idx);
      return { ...preState, hashTags: [...nextMusics] };
    });
  };

  return (
    <Container>
      <MenuInfoBox name="플레이리스트 추가"></MenuInfoBox>
      <PageBox>
        <Wrapper>
          <CreatePlaylistInputBox
            setPlaylist={setPlaylist}
            handleAddChip={handleAddChip}
            playlistName={playlistName}
            description={description}
            hashTag={hashTag}
          />
          <ChipContainer>
            {hashTags.map((hashTag, idx) => (
              <Chip key={idx} deleteHandler={deleteMusics(idx)}>
                {hashTag}
              </Chip>
            ))}
          </ChipContainer>
          <CreatePlaylistMusicList
            musics={musics}
            setModalOption={setModalOption}
            setPlaylist={setPlaylistAll}
          ></CreatePlaylistMusicList>
          <SubmitButtonWrapper>
            <Button
              content="등록"
              background={theme.colors.sky}
              fontSize="1.5em"
              paddingH="2%"
              width="45%"
              onClick={handleSubmit}
            ></Button>
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
