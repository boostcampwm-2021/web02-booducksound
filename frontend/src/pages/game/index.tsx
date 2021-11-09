import { useEffect } from 'react';

import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { useLeavePage } from '~/hooks/useLeavePage';
import useSocket from '~/hooks/useSocket';
import useSocketEmit from '~/hooks/useSocketEmit';
import GameRoomContainer from '~/organisms/GameRoomContainer';
import GameRoomNav from '~/organisms/GameRoomNav';
import { RootState } from '~/reducers/index';
import { GameRoom } from '~/types/GameRoom';
import { SocketEvents } from '~/types/SocketEvents';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 32px;
`;

const Game: NextPage = () => {
  const { uuid } = useSelector((state: RootState) => state.room);
  const userInfo = useSelector((state: RootState) => state.user);
  const socket = useSocket();
  const router = useRouter();

  useEffect(() => {
    // TODO : 닉네임, 부덕이 색깔 등이 설정되어 있지 않으면(로그인 하지 않았다면) 설정 페이지로 보낼 것

    if (!uuid) {
      router.push('/lobby');
    }
  }, []);

  useSocketEmit(
    SocketEvents.JOIN_ROOM,
    uuid,
    userInfo,
    ({ type, message, gameRoom }: { type: string; message: string; gameRoom: GameRoom }) => {
      if (type === 'fail') {
        // TODO : window.alert이 아니라 모달으로 에러 message를 띄우도록 할 것
        window.alert(message);
        router.push('/lobby');
      }

      // TODO : 받아온 gameRoom 데이터에 따라 화면을 렌더링할 것
      console.log('GameRoom Data :', gameRoom);
    },
  );

  useLeavePage(() => {
    if (!socket) return;
    socket.emit(SocketEvents.LEAVE_ROOM, uuid);
  });

  return (
    <Container>
      <GameRoomNav />
      <GameRoomContainer />
    </Container>
  );
};

export default Game;
