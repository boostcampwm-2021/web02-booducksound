import { MutableRefObject, ReactEventHandler, useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { BACKEND_URL } from '~/constants/index';
import { useLeavePage } from '~/hooks/useLeavePage';
import useSocket from '~/hooks/useSocket';
import useSocketEmit from '~/hooks/useSocketEmit';
import useSocketOn from '~/hooks/useSocketOn';
import GameRoomContainer from '~/organisms/GameRoomContainer';
import GameRoomNav from '~/organisms/GameRoomNav';
import { RootState } from '~/reducers/index';
import theme from '~/styles/theme';
import { RoomActions } from '~/types/Actions';
import { GameRoom } from '~/types/GameRoom';
import { SocketEvents } from '~/types/SocketEvents';

const BlurDialog = dynamic(() => import('~/molecules/BlurDialog'));
const GameResultModal = dynamic(() => import('~/organisms/GameResultModal'));

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
  const [gameRoom, setGameRoom] = useState<GameRoom>();
  const [dialogMsg, setDialogMsg] = useState<{ title: string; content: string } | null>(null);
  const [gameResultModalOnOff, setGameResultModalOnOff] = useState(false);
  const [timerEndTime, setTimerEndTime] = useState(0);
  const { uuid } = useSelector((state: RootState) => state.room);
  const userInfo = useSelector((state: RootState) => state.user);
  const socket = useSocket();
  const router = useRouter();
  const dispatch = useDispatch();

  const gameEndRoom = useRef(gameRoom);
  const music1 = useRef<HTMLAudioElement>(null);
  const music2 = useRef<HTMLAudioElement>(null);
  const curMusic: MutableRefObject<HTMLAudioElement | null> = useRef<HTMLAudioElement | null>(null);
  const nextMusic: MutableRefObject<HTMLAudioElement | null> = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!uuid) {
      router.push('/lobby');
    }
  }, []);

  useSocketEmit(
    SocketEvents.JOIN_ROOM,
    uuid,
    userInfo,
    ({ type, message, gameRoom }: { type: string; message: string; gameRoom: GameRoom }) => {
      if (type === 'fail') return router.push('/lobby');

      setGameRoom(gameRoom);
    },
  );

  useSocketOn(SocketEvents.START_GAME, (gameRoom: GameRoom, endTime: number) => {
    if (!music1.current || !music2.current) throw Error('START_GAME에서 audio Element를 찾을 수 없습니다');

    curMusic.current = music1.current;
    nextMusic.current = music2.current;

    curMusic.current.src = `${BACKEND_URL}/game/${uuid}/${1}`;
    nextMusic.current.src = `${BACKEND_URL}/game/${uuid}/${2}`;
    curMusic.current.load();
    nextMusic.current.load();

    setTimerEndTime(endTime);
    setGameRoom(gameRoom);

    const playPromise = curMusic.current.play();

    playPromise.then(() => {
      curMusic.current?.play();
    });
  });

  useSocketOn(
    SocketEvents.ROUND_END,
    ({ type, info, answerCount }: { type: 'SKIP' | 'ANSWER' | 'TIMEOUT'; info: string; answerCount?: number }) => {
      if (type === 'SKIP') {
        setDialogMsg({ title: `${info}`, content: `모두가 SKIP 하였습니다.` });
        return;
      }

      if (type === 'ANSWER') {
        setDialogMsg({ title: `${info}`, content: `${answerCount}명의 플레이어가 맞추었습니다!` });
        return;
      }

      if (type === 'TIMEOUT') {
        setDialogMsg({ title: `${info}`, content: `시간이 초과했습니다.` });
      }
    },
  );

  useSocketOn(
    SocketEvents.NEXT_ROUND,
    (isExistNext: boolean, endTime: number) => {
      if (!curMusic.current || !nextMusic.current) return;
      if (!gameRoom) return;

      setDialogMsg(null);

      const temp = curMusic.current;

      curMusic.current.pause();
      curMusic.current = nextMusic.current;
      nextMusic.current = temp;

      setTimerEndTime(endTime);

      const playPromise = curMusic.current.play();

      playPromise.then(() => {
        curMusic.current?.play();
      });

      if (!isExistNext) return;
      nextMusic.current.src = `${BACKEND_URL}/game/${uuid}/${gameRoom.curRound + 2}`;
      nextMusic.current.load();
    },
    gameRoom?.curRound,
  );

  useSocketOn(
    SocketEvents.GAME_END,
    () => {
      gameEndRoom.current = gameRoom;
      music1.current?.pause();
      music2.current?.pause();
      setDialogMsg(null);
      setGameResultModalOnOff(true);
    },
    gameRoom,
  );

  useSocketOn(SocketEvents.SET_EXPULSION, (id: string) => {
    if (socket && id === socket.id) {
      router.push('/lobby');
    }
  });

  useSocketOn(SocketEvents.SET_GAME_ROOM, (gameRoom: GameRoom) => {
    if (!gameRoom) return;
    setGameRoom(gameRoom);
  });

  useLeavePage(() => {
    if (!socket) return;
    dispatch({ type: RoomActions.SET_UUID, payload: { uuid: null } });
    socket.emit(SocketEvents.LEAVE_ROOM, uuid);
  });

  const handleAudioEnded: ReactEventHandler<HTMLAudioElement> = (e) => {
    const audio = e.target as HTMLAudioElement;
    audio.currentTime = 0;
    audio.play();
  };

  return (
    <Container>
      <GameRoomNav
        players={gameRoom?.players}
        status={gameRoom?.status}
        music1={music1.current}
        music2={music2.current}
        isAllReady={gameRoom?.isAllReady}
      />
      {gameRoom && <GameRoomContainer gameRoom={gameRoom} endTime={timerEndTime} />}
      {dialogMsg && <BlurDialog title={dialogMsg.title} content={dialogMsg.content} />}
      {gameResultModalOnOff && gameEndRoom.current && (
        <GameResultModal gameRoom={gameEndRoom.current} userId={userInfo.id} setModalOnOff={setGameResultModalOnOff} />
      )}
      <audio ref={music1} onEnded={handleAudioEnded} preload="none" />
      <audio ref={music2} onEnded={handleAudioEnded} preload="none" />
    </Container>
  );
};

export default Game;
