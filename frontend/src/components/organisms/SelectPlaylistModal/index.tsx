import { useState, useEffect, SetStateAction, Dispatch, ChangeEvent, MouseEvent } from 'react';

import styled from '@emotion/styled';

import { getPlaylists } from '~/api/playlist';
import InputText from '~/atoms/InputText';
import TextLabel from '~/atoms/TextLabel';
import Modal from '~/molecules/Modal';
import ResponsiveButton from '~/molecules/ResponsiveButton';
import theme from '~/styles/theme';
import { GameRoom } from '~/types/GameRoom';
import { Playlist } from '~/types/Playlist';

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
      skip: GameRoom['skip'] | number;
      timePerProblem: GameRoom['timePerProblem'] | number;
    }>
  >;
  validateForm: Function;
}

const SelectPlaylistModal = ({ setModalOnOff, setForm, validateForm }: Props) => {
  const [search, setSearch] = useState('');
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [pageData, setPageData] = useState({ currentPage: 0, maxPage: 0 });

  useEffect(() => {
    const initPlaylist = async () => {
      const { playlists, currentPage, maxPage }: { playlists: Playlist[]; currentPage: number; maxPage: number } =
        await getPlaylists();
      setPlaylists(playlists);
      setPageData({ currentPage, maxPage });
    };
    initPlaylist();
  }, []);

  const handleSelectPlaylistBtnClick = (e: MouseEvent, playlistId: string, playlistName: string) => {
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
        <PlayLists>
          {playlists &&
            playlists.map(({ playlistName, _id, hashtags, description }, i) => {
              return (
                <PlayList key={i}>
                  <Title>{playlistName}</Title>
                  <ResponsiveButton
                    background={theme.colors.lilac}
                    fontSize="16px"
                    width="80px"
                    onClick={(e) => handleSelectPlaylistBtnClick(e, _id as string, playlistName)}
                  >
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
