import { ChangeEventHandler, useState } from 'react';

import styled from '@emotion/styled';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import InputText from '~/atoms/InputText';
import useSocketEmit from '~/hooks/useSocketEmit';
import useSocketOn from '~/hooks/useSocketOn';
import ResponsiveButton from '~/molecules/ResponsiveButton';
import { RootState } from '~/reducers/index';
import { UserState } from '~/reducers/user';
import theme from '~/styles/theme';
import { RoomActions } from '~/types/Actions';
import { LobbyRoom } from '~/types/LobbyRoom';
import { SocketEvents } from '~/types/SocketEvents';

const RoomCard = dynamic(() => import('~/atoms/RoomCard'));
const EnterPwdModal = dynamic(() => import('~/organisms/EnterPwdModal'));
const CreateRoomModal = dynamic(() => import('~/organisms/CreateRoomModal'));
const InviteCodeModal = dynamic(() => import('~/organisms/InviteCodeModal'));

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

  @media (max-width: ${theme.breakpoints.md}) {
    column-gap: 6px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    column-gap: 4px;
  }
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 32px 8px;
  column-gap: 10px;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 8px 4px;
    row-gap: 6px;
    column-gap: 6px;
    flex-wrap: wrap;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
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

  @media (max-width: ${theme.breakpoints.md}) {
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

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const SearchRoomInputText = styled(InputText)`
  width: 100%;
  font-size: 18px;
  padding: 10px 20px 10px 80px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
  background-position-x: 20px;
  background-size: 25px;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 12px;
  }
`;

const Lobby: NextPage = () => {
  const dispatch = useDispatch();
  const userInfo: UserState = useSelector((state: RootState) => state.user);
  const [enterPwd, setEnterPwd] = useState('');
  const [search, setSearch] = useState('');
  const [codeModalOnOff, setCodeModalOnOff] = useState(false);
  const [createRoomModalOnOff, setCreateRoomModalOnOff] = useState(false);
  const [rooms, setRooms] = useState<{ [uuid: string]: LobbyRoom }>({});
  const { id } = userInfo || {};

  useSocketEmit(SocketEvents.SET_LOBBY_ROOMS, (lobbyRooms: { [uuid: string]: LobbyRoom }) => {
    setRooms(lobbyRooms);
  });

  useSocketOn(SocketEvents.SET_LOBBY_ROOM, (uuid: string, lobbyRoom: LobbyRoom) => {
    setRooms((prev) => {
      const rooms = { ...prev, [uuid]: lobbyRoom };
      return rooms;
    });
  });

  useSocketOn(SocketEvents.DELETE_LOBBY_ROOM, (uuid: string) => {
    setRooms((prev) => {
      const rooms = { ...prev };
      delete rooms[uuid];
      return rooms;
    });
  });

  const handleCodeModalBtn = () => {
    setCodeModalOnOff(true);
  };

  const handleCreateRoomModalBtn = () => {
    setCreateRoomModalOnOff(true);
  };

  const handleSearchChange: ChangeEventHandler = (e) => {
    const search = (e.target as HTMLInputElement).value;
    setSearch(search);
  };

  const handleClickRoomCard = (room: LobbyRoom, uuid: string) => () => {
    const { hasPassword, status } = room;
    if (!uuid || status !== 'waiting') return;
    if (hasPassword) {
      setEnterPwd(uuid);
      return;
    }
    dispatch({ type: RoomActions.SET_UUID, payload: { uuid } });
    Router.push(`/game`);
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
                >
                  MY PAGE
                </ResponsiveButton>
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
              onClick={handleCodeModalBtn}
            >
              초대코드 입력
            </ResponsiveButton>
            {id && (
              <Link href="/playlist/create">
                <a>
                  <ResponsiveButton
                    background={theme.colors.peach}
                    width="180px"
                    fontSize="20px"
                    smWidth="110px"
                    smFontSize="12px"
                  >
                    플레이리스트 추가
                  </ResponsiveButton>
                </a>
              </Link>
            )}
            <ResponsiveButton
              background={theme.colors.sand}
              width="180px"
              fontSize="20px"
              smWidth="110px"
              smFontSize="12px"
              onClick={handleCreateRoomModalBtn}
            >
              방 생성
            </ResponsiveButton>
            {codeModalOnOff && (
              <InviteCodeModal rooms={Object.keys(rooms)} setModalOnOff={setCodeModalOnOff} leftButtonText="입장" />
            )}
            {createRoomModalOnOff && <CreateRoomModal setModalOnOff={setCreateRoomModalOnOff} leftButtonText="생성" />}
          </NavItem>
        </Nav>
        <SearchContainer>
          <SearchWrapper>
            <SearchRoomInputText
              className="searchRoom"
              isSearch={true}
              placeholder="검색어를 입력하세요"
              value={search}
              handleChange={handleSearchChange}
            ></SearchRoomInputText>
          </SearchWrapper>
        </SearchContainer>
        <GridContainer>
          <GridWrapper>
            {rooms &&
              Object.entries(rooms)
                .filter(([uuid, { title, playlistName }]) => title.includes(search) || playlistName.includes(search))
                .map(([uuid, room]) => (
                  <RoomCard key={uuid} room={room} handleClickRoomCard={handleClickRoomCard(room, uuid)} />
                ))}
          </GridWrapper>
        </GridContainer>
      </Wrapper>
      {enterPwd && <EnterPwdModal uuid={enterPwd} setModalOnOff={setEnterPwd} leftButtonText="입장" />}
    </Container>
  );
};

export default Lobby;
