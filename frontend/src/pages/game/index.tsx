import { MutableRefObject, ReactEventHandler, useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { BACKEND_URL } from '~/constants/index';
import { useLeavePage } from '~/hooks/useLeavePage';
import useSocket from '~/hooks/useSocket';
import useSocketEmit from '~/hooks/useSocketEmit';
import useSocketOn from '~/hooks/useSocketOn';
import GameRoomContainer from '~/organisms/GameRoomContainer';
import GameRoomNav from '~/organisms/GameRoomNav';
import { RootState } from '~/reducers/index';
import theme from '~/styles/theme';
import { GameRoom } from '~/types/GameRoom';
import { Player } from '~/types/Player';
import { SocketEvents } from '~/types/SocketEvents';

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  max-width: 1360px;
  height: 100vh;
  margin: 0 auto;
  padding: 4px 32px;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 4px 8px;
  }
`;

const Game: NextPage = () => {
  const [players, setPlayers] = useState<{ [socketId: string]: Player }>({});
  const [gameRoom, setGameRoom] = useState<GameRoom>();
  const [isAllReady, setIsAllReady] = useState<boolean>(false);
  const { uuid } = useSelector((state: RootState) => state.room);
  const userInfo = useSelector((state: RootState) => state.user);
  const socket = useSocket();
  const router = useRouter();

  const music1 = useRef<HTMLAudioElement>(null);
  const music2 = useRef<HTMLAudioElement>(null);
  const curMusic: MutableRefObject<HTMLAudioElement | null> = useRef<HTMLAudioElement | null>(null);
  const nextMusic: MutableRefObject<HTMLAudioElement | null> = useRef<HTMLAudioElement | null>(null);

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
        // // TODO : window.alert이 아니라 모달으로 에러 message를 띄우도록 할 것
        // window.alert(message);
        router.push('/lobby');
      }

      // TODO : 받아온 gameRoom 데이터에 따라 화면을 렌더링할 것
      console.log('GameRoom Data :', gameRoom);
      setGameRoom(gameRoom);
    },
  );

  useSocketOn(SocketEvents.START_GAME, (gameRoom: GameRoom) => {
    if (!music1.current || !music2.current) throw Error('START_GAME에서 audio Element를 찾을 수 없습니다');

    curMusic.current = music1.current;
    nextMusic.current = music2.current;

    curMusic.current.src = `${BACKEND_URL}/game/${uuid}/init`;
    nextMusic.current.src = `${BACKEND_URL}/game/${uuid}/next`;

    setGameRoom(gameRoom);

    const playPromise = curMusic.current.play();

    playPromise.then(() => {
      curMusic.current?.play();
    });
  });

  useSocketOn(SocketEvents.NEXT_ROUND, () => {
    if (!curMusic.current || !nextMusic.current) throw Error('NEXT_ROUND에서 curMusic, nextMusic을 찾을 수 없습니다');

    const temp = curMusic.current;

    curMusic.current.pause();
    curMusic.current = nextMusic.current;
    nextMusic.current = temp;

    const playPromise = curMusic.current.play();

    playPromise.then(() => {
      curMusic.current?.play();
    });

    nextMusic.current.src = `${BACKEND_URL}/game/${uuid}/next`;
  });

  useSocketOn(SocketEvents.GAME_END, () => window.alert('마지막 라운드에 다다랐습니다. GAME_END'));
  useSocketOn(SocketEvents.SET_PLAYER, ({ players, isAllReady }) => {
    setPlayers(players);
    setIsAllReady(isAllReady);
  });

  useLeavePage(() => {
    if (!socket) return;
    socket.emit(SocketEvents.LEAVE_ROOM, uuid);
  });

  useEffect(() => {
    socket?.on(SocketEvents.SET_GAME_ROOM, (gameRoom: GameRoom) => {
      if (gameRoom !== undefined) {
        setGameRoom(gameRoom);
      }
    });
  }, []);

  const handleAudioEnded: ReactEventHandler<HTMLAudioElement> = (e) => {
    const audio = e.target as HTMLAudioElement;
    audio.currentTime = 0;
    audio.play();
  };

  return (
    <Container>
      <GameRoomNav players={players} status={gameRoom?.status} isAllReady={isAllReady} />
      <GameRoomContainer players={players} gameRoom={gameRoom} />
      <audio ref={music1} onEnded={handleAudioEnded} />
      <audio ref={music2} onEnded={handleAudioEnded} />
      <button
        style={{ width: '1000px', position: 'absolute', top: '0' }}
        onClick={() => {
          socket?.emit('TEST_DESTROY');
        }}
      >
        디스트로이
      </button>
    </Container>
  );
};

export default Game;
