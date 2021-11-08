import { useCallback, useState } from 'react';

import Button from '@atoms/Button';
import MenuInfoBox from '@atoms/MenuInfoBox';
import PageBox from '@atoms/PageBox';
import styled from '@emotion/styled';
import useEventListener from '@hooks/useEventListener';
import Chip from '@molecules/Chip';
import CreatePlaylistInputBox from '@organisms/CreatePlaylistInputBox';
import CreatePlaylistMusicList from '@organisms/CreatePlaylistMusicList';
import CreatePlaylistMusicModal from '@organisms/CreatePlaylistMusicModal';
import theme from '@styles/theme';
import { Music } from '@type/Music';
import type { NextPage } from 'next';

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

const PlaylistCreate: NextPage = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [hashTag, setHashTag] = useState<string>('');
  const [chips, setChips] = useState<string[]>([]);
  const [musics, setMusics] = useState<Music[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const pressEnterHandler = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      if (!hashTag) return;
      setHashTag('');
      setChips((preState) => [...preState, hashTag]);
    },
    [hashTag],
  );
  useEventListener('keyup', pressEnterHandler);

  return (
    <Container>
      <MenuInfoBox name="플레이리스트 추가"></MenuInfoBox>
      <PageBox>
        <Wrapper>
          <CreatePlaylistInputBox
            setTitle={(e) => setTitle((e.currentTarget as HTMLTextAreaElement).value)}
            setDescription={(e) => setDescription((e.currentTarget as HTMLTextAreaElement).value)}
            setHashTag={(e) => setHashTag((e.currentTarget as HTMLTextAreaElement).value)}
            title={title}
            description={description}
            hashTag={hashTag}
          />
          <ChipContainer>
            {chips.map((chip, idx) => (
              <Chip
                content={chip}
                key={idx}
                deleteHandler={(e) => {
                  setChips((preState) => [...preState.filter((chip, i) => i !== idx)]);
                }}
              ></Chip>
            ))}
          </ChipContainer>
          <CreatePlaylistMusicList
            musics={musics}
            setIsOpenModal={(e) => setIsOpenModal(true)}
            setMusics={(target: number) =>
              setMusics((preState) => [...preState.filter((music, idx) => idx !== target)])
            }
          ></CreatePlaylistMusicList>
          <SubmitButtonWrapper>
            <Button content="등록" background={theme.colors.sky} fontSize="1.5em" paddingH="2%" width="45%"></Button>
          </SubmitButtonWrapper>
        </Wrapper>
      </PageBox>
      {isOpenModal && (
        <CreatePlaylistMusicModal setIsOpenModal={setIsOpenModal} setMusics={setMusics}></CreatePlaylistMusicModal>
      )}
    </Container>
  );
};

export default PlaylistCreate;
