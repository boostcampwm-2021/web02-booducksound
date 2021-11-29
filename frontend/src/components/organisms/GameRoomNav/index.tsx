import { useState, useEffect } from 'react';

import styled from '@emotion/styled';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { COPY_SUCC_MSG, TOAST_OPTION, INIT_VOLUME, MAX_VOLUME } from '~/constants/index';
import useSocket from '~/hooks/useSocket';
import ResponsiveButton from '~/molecules/ResponsiveButton';
import { RootState } from '~/reducers/index';
import theme from '~/styles/theme';
import { Player } from '~/types/Player';
import { Players } from '~/types/Players';
import { SocketEvents } from '~/types/SocketEvents';

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px 12px 8px;
  font-size: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 14px;
    padding: 4px 4px 8px 4px;
  }
`;

const FlexItem = styled.div`
  display: flex;
  align-items: stretch;
  column-gap: 8px;
`;

const ExitAnchor = styled.a`
  display: flex;
  align-items: stretch;
`;

const MuteButton = styled.button`
  border: none;
  outline: none;
  width: 48px;
  height: 48px;
  grid-area: speaker;
  background: url('images/ic_speaker${({ volume }: { volume: number }) => !volume && '_off'}.png') no-repeat center/24px;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 32px;
    height: 32px;
  }

  &:hover {
    opacity: 0.6;
  }
`;

const VolumeBar = styled.input`
  margin-right: auto;
  -webkit-appearance: none;
  overflow: hidden;
  width: 80px;
  height: 5px;
  align-self: center;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.whitesmoke};
  border-radius: 10px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0;
    height: 5px;
    background-color: ${({ theme }) => theme.colors.deepgray};
    box-shadow: -100vw 0 0 100vw ${({ theme }) => theme.colors.deepgray};
    cursor: pointer;
  }
`;

const converter: { [status: string]: 'ready' | 'prepare' } = { prepare: 'ready', ready: 'prepare' };
const statusEncoder = { king: '시작하기', prepare: '준비하기', ready: '준비완료' };

const GameRoomNav = ({
  players,
  status,
  music1,
  music2,
  isAllReady,
}: {
  players?: Players;
  status: 'playing' | 'waiting' | 'resting' | undefined;
  music1: HTMLAudioElement | null;
  music2: HTMLAudioElement | null;
  isAllReady?: boolean;
}) => {
  const { uuid } = useSelector((state: RootState) => state.room);
  const socket = useSocket();
  const player = socket && players?.[socket.id];
  // const [preventMulti, setPreventMulti] = useState(false);
  const [volume, setVolume] = useState(INIT_VOLUME);

  const changeStatus = (player: Player) => () => {
    if (player.status !== 'king') player = { ...player, status: converter[player.status] };
    socket?.emit(SocketEvents.SET_PLAYER, uuid, player);
  };

  const startGame = () => socket?.emit(SocketEvents.START_GAME, uuid);

  const makeSkip = () => {
    // if (preventMulti) return;
    // setPreventMulti(true);
    socket?.emit(SocketEvents.SKIP, uuid, socket.id);
  };

  const handleStartBtnClick = (player: Player) => {
    if (status === 'playing') return makeSkip;
    if (player.status === 'king') return startGame;
    return changeStatus(player);
  };

  const handleMute = () => (volume === 0 ? setVolume(100) : setVolume(0));

  const handleVolume = ({ target }: any) => setVolume(target.value);

  const handleCopy = () => {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = uuid as string;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    toast.info(COPY_SUCC_MSG, TOAST_OPTION);
  };

  // useEffect(() => {
  //   if (!preventMulti) return;
  //   setTimeout(() => {
  //     setPreventMulti(false);
  //   }, 1000);
  // }, [preventMulti]);

  useEffect(() => {
    if (!music1 || !music2) return;
    music1.volume = volume / MAX_VOLUME;
    music2.volume = volume / MAX_VOLUME;
  }, [volume, music1, music2]);

  return (
    <Container>
      <MuteButton type="button" volume={volume} onClick={handleMute} />
      <VolumeBar name="volume" value={volume} min="0" max="100" step="5" type="range" onChange={handleVolume} />
      <FlexItem>
        {status === 'waiting' && (
          <ResponsiveButton
            width="160px"
            height="46px"
            mdWidth="100px"
            mdHeight="34px"
            smWidth="82px"
            smHeight="28px"
            background={theme.colors.lime}
            fontSize="1em"
            smFontSize="0.8em"
            onClick={handleCopy}
          >
            초대코드 복사
          </ResponsiveButton>
        )}
        {player && (
          <ResponsiveButton
            width="160px"
            height="46px"
            mdWidth="100px"
            mdHeight="34px"
            smWidth="82px"
            smHeight="28px"
            background={
              status === 'waiting'
                ? player.status !== 'ready'
                  ? theme.colors.lightsky
                  : theme.colors.lilac
                : theme.colors.peach
            }
            fontSize="1em"
            smFontSize="0.8em"
            onClick={handleStartBtnClick(player)}
            disabled={status === 'resting' || player.skip || (player.status === 'king' && !isAllReady)}
          >
            {status === 'waiting' ? statusEncoder[player.status] : 'SKIP'}
          </ResponsiveButton>
        )}
        <Link href="/lobby" passHref>
          <ExitAnchor>
            <ResponsiveButton
              width="160px"
              height="46px"
              mdWidth="100px"
              mdHeight="34px"
              smWidth="82px"
              smHeight="28px"
              fontSize="1em"
              smFontSize="0.8em"
              background={theme.colors.sand}
            >
              나가기
            </ResponsiveButton>
          </ExitAnchor>
        </Link>
      </FlexItem>
    </Container>
  );
};

export default GameRoomNav;
