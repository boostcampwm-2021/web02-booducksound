import { useState, useEffect, SetStateAction, Dispatch, ChangeEventHandler, KeyboardEventHandler } from 'react';

import styled from '@emotion/styled';
import Image from 'next/image';

import InputText from '~/atoms/InputText';
import TextLabel from '~/atoms/TextLabel';
import useSocket from '~/hooks/useSocket';
import Modal from '~/molecules/Modal';
import { Music } from '~/types/Music';
import { SocketEvents } from '~/types/SocketEvents';

interface UrlProps {
  url: string;
}
const MusicBox = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
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

const SearchList = styled.ul`
  display: flex;
  flex-direction: column;
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
    if (e.key !== 'Enter') return;
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
        <InputText
          className="SearchListearch"
          isSearch={true}
          placeholder="검색어를 입력해주세요"
          value={search}
          handleChange={handleSearchChange}
          handleEnter={handleEnter}
        />
        <SearchList>
          {musicList?.map((element: SearchedListProps, index) => (
            <MusicBox
              key={index}
              onClick={() => {
                setMusic((preState) => {
                  return { ...preState, url: element.url };
                });
                setModalOnOff(false);
              }}
            >
              {/* <Image width={200} height={200} src={element.url} alt="" /> */}
              <div key={index} onClick={() => console.log(element.url)}>
                {element.title}
              </div>
            </MusicBox>
          ))}
        </SearchList>
      </Container>
    </Modal>
  );
};

export default SelectPlaylistModal;
