import { useState, SetStateAction, Dispatch, MouseEventHandler, ChangeEvent } from 'react';

import styled from '@emotion/styled';

import InputText from '~/atoms/InputText';
import TextLabel from '~/atoms/TextLabel';
import Modal from '~/molecules/Modal';
import ResponsiveButton from '~/molecules/ResponsiveButton';
import theme from '~/styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  padding: 8px 0;
  margin: 0 auto;
  row-gap: 24px;
  font-size: 16px;
  overflow-y: scroll;
  padding: 8px;
  width: 100%;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 16px;
  }
`;

const PlayLists = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 100%;
`;

const PlayList = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.gray};
  padding: 20px 8px;
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  &:hover {
    filter: brightness(0.98);
  }
`;

const Title = styled.h4`
  font-size: 1em;
`;

interface Props {
  setModalOnOff: Dispatch<SetStateAction<boolean>>;
  setForm: Dispatch<
    SetStateAction<{
      title: string;
      playlistName: string;
      playlistId: string;
      password: string;
      skip: number;
      timePerProblem: number;
    }>
  >;
  validateForm: Function;
}

const playlists = [
  {
    title: '플레이리스트1',
    hashtags: ['ㅁㄴㅇㄹ', '해시1', '해시태그2'],
    playCount: 8,
    description: '플레이리스트 설명입니다~~@!#!@#@!',
    playlistId: 'asdfdsafsadf12f2ef2f',
  },
  {
    title: 'playlist',
    hashtags: ['ㅁㄴㅇㄹ', '해시1', '해시태그2'],
    playCount: 8,
    description: '플레이리스트 설명입니다~~@!#!@#@!',
    playlistId: 'asdfdsafsadf12f2ef2f',
  },
  {
    title: '플레이리스트 2222',
    hashtags: ['ㅁㄴㅇㄹ', '해시1', '해시태그2'],
    playCount: 8,
    description: '플레이리스트 설명입니다~~@!#!@#@!',
    playlistId: 'asdfdsafsadf12f2ef2f',
  },
  {
    title: '플레이리스트 3233333',
    hashtags: ['ㅁㄴㅇㄹ', '해시1', '해시태그2'],
    playCount: 8,
    description: '플레이리스트 설명입니다~~@!#!@#@!',
    playlistId: 'asdfdsafsadf12f2ef2f',
  },
  {
    title: '플레이리스트 44',
    hashtags: ['ㅁㄴㅇㄹ', '해시1', '해시태그2'],
    playCount: 8,
    description: '플레이리스트 설명입니다~~@!#!@#@!',
    playlistId: 'asdfdsafsadf12f2ef2f',
  },
  {
    title: '플레이리스트 44',
    hashtags: ['ㅁㄴㅇㄹ', '해시1', '해시태그2'],
    playCount: 8,
    description: '플레이리스트 설명입니다~~@!#!@#@!',
    playlistId: 'asdfdsafsadf12f2ef2f',
  },
  {
    title: '플레이리스트 44',
    hashtags: ['ㅁㄴㅇㄹ', '해시1', '해시태그2'],
    playCount: 8,
    description: '플레이리스트 설명입니다~~@!#!@#@!',
    playlistId: 'asdfdsafsadf12f2ef2f',
  },
];

const SelectPlaylistModal = ({ setModalOnOff, setForm, validateForm }: Props) => {
  const [search, setSearch] = useState('');

  const handleSelectPlaylistBtnClick: MouseEventHandler = (e) => {
    const button = (e.target as Element).closest('button');
    if (!button) return;

    const li = (e.target as Element).closest('li');
    if (!li) return;

    const playlistId = li.dataset.playlistId as string;
    const playlistName = li.dataset.playlistName as string;

    setForm((prev) => {
      const form = { ...prev, playlistId, playlistName };
      validateForm(form);
      return form;
    });

    setModalOnOff(false);
  };

  return (
    <Modal
      height="600px"
      maxWidth="720px"
      rightButtonHandler={() => setModalOnOff(false)}
      hasModalBackground={false}
      hasOnlyCancleBtn={true}
    >
      <Container>
        <TextLabel>플레이리스트 선택</TextLabel>
        <InputText
          className="playlistSearch"
          isSearch={true}
          placeholder="검색어를 입력해주세요"
          value={search}
          handleChange={(e: ChangeEvent) => setSearch((e.target as HTMLInputElement).value)}
        />
        <PlayLists onClick={handleSelectPlaylistBtnClick}>
          {playlists &&
            playlists.map(({ title, hashtags, playCount, description, playlistId }, i) => {
              return (
                <PlayList data-playlist-id={playlistId} data-playlist-name={title} key={i}>
                  <Title>{title}</Title>
                  <ResponsiveButton background={theme.colors.lilac} fontSize="16px" width="80px">
                    선택
                  </ResponsiveButton>
                </PlayList>
              );
            })}
        </PlayLists>
      </Container>
    </Modal>
  );
};

export default SelectPlaylistModal;
