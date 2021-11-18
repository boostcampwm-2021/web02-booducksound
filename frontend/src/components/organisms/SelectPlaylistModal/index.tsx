import { useState, useEffect, SetStateAction, Dispatch, MouseEvent, useRef, ChangeEventHandler } from 'react';

import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';

import { getPlaylists as fetchPlaylists } from '~/api/playlist';
import InputText from '~/atoms/InputText';
import TextLabel from '~/atoms/TextLabel';
import Modal from '~/molecules/Modal';
import ResponsiveButton from '~/molecules/ResponsiveButton';
import theme from '~/styles/theme';
import { GameRoom } from '~/types/GameRoom';
import { Playlist } from '~/types/Playlist';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  padding: 12px;
  margin: 0 auto;
  row-gap: 24px;
  font-size: 16px;
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

const SelectButton = styled(ResponsiveButton)`
  margin-left: 20px;
`;

const PlaylistInfo = styled.div`
  display: flex;
  justify-content: left;
  width: 150px;
  margin-right: 10px;
  overflow: hidden;
  white-space: nowrap;
`;

const Description = styled.span`
  color: #999;
  margin-right: 20px;
  animation-name: slideFont;
  animation-duration: 9s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes slideFont {
    from {
      margin-left: -150px;
    }
    to {
      margin-left: 180px;
    }
  }
`;

const SearchInputText = styled(InputText)`
  padding: 12px 10px 12px 70px;
  background-position-x: 25px;
`;

const Hashtags = styled.span`
  color: ${theme.colors.ocean};
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 5px;
  font-size: 0.85em;
  color: #ccc;
  height: 100%;
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
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastRef, isLastInView] = useInView();
  const maxPage = useRef(Infinity);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const getPlaylists = async (page: number, search: string, option?: { init?: boolean }) => {
    setIsLoading(true);

    const { playlists, maxPage: maxPageNumber } = await fetchPlaylists({ page, q: search });

    maxPage.current = Number(maxPageNumber);

    if (option?.init) {
      setPage(1);
      setPlaylists(playlists || []);
    } else setPlaylists((prevState) => [...prevState, ...playlists]);

    setIsLoading(false);
  };

  useEffect(() => {
    getPlaylists(page, search);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (!isLastInView || isLoading) return;
    if (page >= maxPage.current) return;

    setPage((prevState) => prevState + 1);

    getPlaylists(page + 1, search);
  }, [isLastInView, isLoading]);

  const handleSearchChange: ChangeEventHandler = (e) => {
    const search = (e.target as HTMLInputElement).value;
    setSearch(search);

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      getPlaylists(1, search, { init: true });
    }, 200);
  };

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
        <SearchInputText
          className="playlistSearch"
          isSearch={true}
          placeholder="검색어를 입력해주세요"
          value={search}
          handleChange={handleSearchChange}
        />
        <PlayLists>
          {playlists.map(({ playlistName, _id, hashtags, description, likeCount, playCount }, i) => {
            return (
              <PlayList key={_id} ref={playlists.length - 1 === i ? lastRef : null}>
                <Title>{playlistName}</Title>
                <Contents>
                  <PlaylistInfo>
                    <Description>{description}</Description>
                    <Hashtags>{hashtags.map((hashtag) => `#${hashtag} `)}</Hashtags>
                  </PlaylistInfo>
                  <span>💙 {likeCount}</span>
                  <span>🎧 {playCount}</span>
                  <SelectButton
                    background={theme.colors.lilac}
                    fontSize="16px"
                    width="80px"
                    onClick={(e) => handleSelectPlaylistBtnClick(e, _id as string, playlistName)}
                  >
                    선택
                  </SelectButton>
                </Contents>
              </PlayList>
            );
          })}
        </PlayLists>
      </Container>
    </Modal>
  );
};

export default SelectPlaylistModal;
