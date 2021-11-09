import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import useSocket from '~/hooks/useSocket';
import useSocketEmit from '~/hooks/useSocketEmit';
import useSocketOn from '~/hooks/useSocketOn';
import GameRoomContainer from '~/organisms/GameRoomContainer';
import GameRoomNav from '~/organisms/GameRoomNav';
import { RootState } from '~/reducers/index';
import { GameRoom } from '~/types/GameRoom';
import { Player } from '~/types/Player';
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
  const [players, setPlayers] = useState<{ [socketId: string]: Player }>({});
  const [player, setPlayer] = useState<Player>({ nickname: '', color: '', status: 'prepare' });
  const { uuid } = useSelector((state: RootState) => state.room);
  const userInfo = useSelector((state: any) => state.user);
  const router = useRouter();
  const socket = useSocket();

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

  useSocketOn(SocketEvents.SET_GAME_ROOM, ({ players }) => {
    setPlayers(players);
    if (players !== null && socket !== null) {
      setPlayer(players[socket?.id]);
    }
    console.log(players);
  });

  return (
    <Container>
      <GameRoomNav player={player} />
      <GameRoomContainer players={players} />
    </Container>
  );
};

export default Game;
