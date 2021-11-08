import { useState } from 'react';

import InputBox from '@atoms/InputBox';
import RoomCard from '@atoms/RoomCard';
import styled from '@emotion/styled';
import ResponsiveButton from '@molecules/ResponsiveButton';
import CreateRoomModal from '@organisms/CreateRoomModal';
import theme from '@styles/theme';
import { LobbyRoom } from '@type/LobbyRoom';
import type { NextPage } from 'next';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 32px;
`;

const Wrapper = styled.div`
  max-width: 1600px;
  width: 100%;
`;

const NavItem = styled.div`
  display: flex;
  height: fit-content;
  column-gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    column-gap: 6px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    column-gap: 4px;
  }
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 32px 8px;
  column-gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 8px 4px;
    row-gap: 6px;
    column-gap: 6px;
    flex-wrap: wrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 8px 2px;
    column-gap: 4px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  margin-bottom: 48px;
`;

const SearchWrapper = styled.div`
  padding: 0 8px;
  width: 576px;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 8px;
`;

const GridWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  justify-items: stretch;
  row-gap: 12px;
  column-gap: 12px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const dummyRooms: LobbyRoom[] = [
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'playing',
    hasPassword: true,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'waiting',
    hasPassword: false,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'playing',
    hasPassword: false,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'waiting',
    hasPassword: true,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'waiting',
    hasPassword: true,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'waiting',
    hasPassword: false,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'playing',
    hasPassword: false,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'waiting',
    hasPassword: true,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'playing',
    hasPassword: true,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'waiting',
    hasPassword: false,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'playing',
    hasPassword: false,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'waiting',
    hasPassword: true,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'waiting',
    hasPassword: true,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'waiting',
    hasPassword: false,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'playing',
    hasPassword: false,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'waiting',
    hasPassword: true,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'waiting',
    hasPassword: false,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'playing',
    hasPassword: false,
  },
  {
    title: '방 제목입니다',
    playlistName: '플레이리스트 이름입니다',
    hashtags: ['해시태그1', '해시태그2'],
    curPeople: 2,
    maxPeople: 8,
    status: 'waiting',
    hasPassword: true,
  },
];

const Lobby: NextPage = () => {
  const [createRoomModalOnOff, setCreateRoomModalOnOff] = useState(false);

  const handleCreateRoomModalBtn = () => {
    setCreateRoomModalOnOff(true);
  };

  return (
    <Container>
      <Wrapper>
        <Nav>
          <NavItem>
            <Link href="/mypage">
              <a>
                <ResponsiveButton
                  background={theme.colors.lime}
                  width="180px"
                  fontSize="20px"
                  smWidth="110px"
                  smFontSize="12px"
                  content="MY PAGE"
                />
              </a>
            </Link>
          </NavItem>
          <NavItem>
            <ResponsiveButton
              background={theme.colors.lightsky}
              width="180px"
              fontSize="20px"
              smWidth="110px"
              smFontSize="12px"
              content="초대코드 입력"
            />
            <Link href="playlist/create">
              <a>
                <ResponsiveButton
                  background={theme.colors.peach}
                  width="180px"
                  fontSize="20px"
                  smWidth="110px"
                  smFontSize="12px"
                  content="플레이리스트 추가"
                />
              </a>
            </Link>
            <ResponsiveButton
              background={theme.colors.sand}
              width="180px"
              fontSize="20px"
              smWidth="110px"
              smFontSize="12px"
              content="방 생성"
              onClick={handleCreateRoomModalBtn}
            />
            {createRoomModalOnOff && <CreateRoomModal setModalOnOff={setCreateRoomModalOnOff} leftButtonText="생성" />}
          </NavItem>
        </Nav>
        <SearchContainer>
          <SearchWrapper>
            <InputBox
              isSearch={true}
              placeholder="검색어를 입력하세요"
              width="100%"
              height="54px"
              fontSize="18px"
            ></InputBox>
          </SearchWrapper>
        </SearchContainer>
        <GridContainer>
          <GridWrapper>
            {dummyRooms &&
              dummyRooms.map((room, i) => {
                return <RoomCard key={i} {...room} />;
              })}
          </GridWrapper>
        </GridContainer>
      </Wrapper>
    </Container>
  );
};

export default Lobby;
