import { useState, useEffect } from 'react';

import styled from '@emotion/styled';
import Link from 'next/link';
import { useSelector } from 'react-redux';

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

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 14px;
    padding: 4px 4px 8px 4px;
  }
`;

const FlexItem = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

const MuteButton = styled.button`
  border: none;
  outline: none;
  width: 48px;
  height: 48px;
  grid-area: speaker;
  background: url('images/ic_speaker${({ volume }: { volume: number }) => !volume && '_off'}.png') no-repeat center/24px;
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.md}) {
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
  width: 100px;
  height: 5px;
  align-self: center;
  cursor: pointer;
  background: ${theme.colors.whitesmoke};
  border-radius: 10px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0;
    height: 5px;
    background-color: ${theme.colors.deepgray};
    box-shadow: -100vw 0 0 100vw ${theme.colors.deepgray};
    cursor: pointer;
  }
`;

const converter: { [status: string]: 'ready' | 'prepare' } = { prepare: 'ready', ready: 'prepare' };
const statusEncoder = { king: 'START', prepare: 'PREPARE', ready: 'READY' };

const GameRoomNav = ({
  players,
  status,
  music1,
  music2,
  isAllReady,
}: {
  players?: Players;
  status: 'playing' | 'waiting' | undefined;
  music1: HTMLAudioElement | null;
  music2: HTMLAudioElement | null;
  isAllReady?: boolean;
}) => {
  const { uuid } = useSelector((state: RootState) => state.room);
  const socket = useSocket();
  const player = socket && players?.[socket.id];

  const changeStatus = (player: Player) => () => {
    if (player.status !== 'king') player = { ...player, status: converter[player.status] };
    socket?.emit(SocketEvents.SET_PLAYER, uuid, player);
  };

  const startGame = () => socket?.emit(SocketEvents.START_GAME);

  const makeSkip = () => {
    socket?.emit(SocketEvents.SKIP, uuid, socket.id);
  };

  const handleStartBtnClick = (player: Player) => {
    if (status === 'playing') return makeSkip;
    if (player.status === 'king') return startGame;
    return changeStatus(player);
  };

  const [volume, setVolume] = useState(70);

  const handleMute = () => (volume === 0 ? setVolume(100) : setVolume(0));
  const handleVolume = ({ target }: any) => setVolume(target.value);

  useEffect(() => {
    if (!music1 || !music2) return;
    music1.volume = volume / 100;
    music2.volume = volume / 100;
  }, [volume, music1, music2]);

  return (
    <Container>
      <MuteButton type="button" volume={volume} onClick={handleMute} />
      <VolumeBar name="volume" value={volume} min="0" max="100" step="5" type="range" onChange={handleVolume} />
      <FlexItem>
        {player && (
          <ResponsiveButton
            width="160px"
            mdWidth="84px"
            background={theme.colors.whitesmoke}
            fontSize="1em"
            onClick={handleStartBtnClick(player)}
            disabled={player.skip || (player.status === 'king' && !isAllReady)}
          >
            {status === 'waiting' ? statusEncoder[player.status] : 'SKIP'}
          </ResponsiveButton>
        )}
        <Link href="/lobby">
          <a>
            <ResponsiveButton width="160px" fontSize="1em" background={theme.colors.sand} mdWidth="84px">
              나가기
            </ResponsiveButton>
          </a>
        </Link>
      </FlexItem>
    </Container>
  );
};

export default GameRoomNav;
