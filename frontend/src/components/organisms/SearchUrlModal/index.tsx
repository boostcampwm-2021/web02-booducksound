import { useState, SetStateAction, Dispatch, ChangeEventHandler, KeyboardEventHandler } from 'react';

import styled from '@emotion/styled';

import InputText from '~/atoms/InputText';
import TextLabel from '~/atoms/TextLabel';
import { SEARCH_EMPTY_MSG } from '~/constants/index';
import useSocket from '~/hooks/useSocket';
import Modal from '~/molecules/Modal';
import { Music } from '~/types/Music';
import { SocketEvents } from '~/types/SocketEvents';

const MusicBox = styled.li`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 12px;
  border-bottom: 1px solid gray;
  background-color: white;

  :hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
`;

const Thumbnail = styled.div<{ thumbnail: string }>`
  width: 50px;
  height: 50px;
  flex: 0 0 50px;
  background-position: center;
  background: url(${({ thumbnail }) => thumbnail});
  background-size: cover;
`;

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

const SearchInputText = styled(InputText)`
  background-position-x: 20px;
  padding: 12px 10px 12px 70px;
`;

const Title = styled.p`
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SearchList = styled.ul`
  width: 100%;
  align-self: center;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
  overflow-y: scroll;
  height: 100%;
`;

interface SearchedListProps {
  title: string;
  url: string;
  thumbnails: string;
}

interface Props {
  setModalOnOff: Dispatch<SetStateAction<boolean>>;
  setMusic: Dispatch<SetStateAction<Music>>;
}

const SelectPlaylistModal = ({ setModalOnOff, setMusic }: Props) => {
  const [musicList, setMusicList] = useState<SearchedListProps[]>();
  const [search, setSearch] = useState('');
  const socket = useSocket();

  const handleSearchChange: ChangeEventHandler = (e) => {
    const search = (e.target as HTMLInputElement).value;
    setSearch(search);
  };

  const handleEnter: KeyboardEventHandler = (e) => {
    socket?.emit(SocketEvents.SEARCH_URL, search, (res: SearchedListProps[]) => {
      setMusicList(res);
    });
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
        <TextLabel>노래 검색</TextLabel>
        <SearchInputText
          className="SearchListearch"
          isSearch={true}
          placeholder={SEARCH_EMPTY_MSG}
          value={search}
          handleChange={handleSearchChange}
          handleEnter={handleEnter}
        />
        <SearchList>
          {musicList?.map((element: SearchedListProps, index) => (
            <MusicBox
              key={index}
              onClick={() => {
                setMusic((preState) => ({ ...preState, url: element.url }));
                setModalOnOff(false);
              }}
            >
              <Thumbnail thumbnail={element.thumbnails} />
              <Title key={index}>{element.title}</Title>
            </MusicBox>
          ))}
        </SearchList>
      </Container>
    </Modal>
  );
};

export default SelectPlaylistModal;
