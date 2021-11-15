import styled from '@emotion/styled';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import useSocket from '~/hooks/useSocket';
import ResponsiveButton from '~/molecules/ResponsiveButton';
import { RootState } from '~/reducers/index';
import theme from '~/styles/theme';
import { Player } from '~/types/Player';
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
  background: url('images/ic_speaker.png') no-repeat center/68%;
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 32px;
    height: 32px;
  }

  &:hover {
    opacity: 0.6;
  }
`;

const converter: { [status: string]: 'ready' | 'prepare' } = { prepare: 'ready', ready: 'prepare' };
const statusEncoder = { king: 'START', prepare: 'PREPARE', ready: 'READY' };

const GameRoomNav = ({ player }: { player: Player }) => {
  const { uuid } = useSelector((state: RootState) => state.room);
  const socket = useSocket();

  const changeStatus = (player: Player) => {
    if (player.status !== 'king') player = { ...player, status: converter[player.status] };
    socket?.emit(SocketEvents.SET_PLAYER, uuid, player);
  };

  return (
    <Container>
      <MuteButton type="button" />
      <FlexItem>
        <ResponsiveButton
          width="160px"
          fontSize="1em"
          background={theme.colors.whitesmoke}
          mdWidth="84px"
          onClick={() => changeStatus(player)}
        >
          {statusEncoder[player.status]}
        </ResponsiveButton>
        <Link href="/lobby">
          <a>
            <ResponsiveButton
              width="160px"
              fontSize="1em"
              background={theme.colors.sand}
              mdWidth="84px"
              onClick={() => console.log('나가기')}
            >
              나가기
            </ResponsiveButton>
          </a>
        </Link>
      </FlexItem>
    </Container>
  );
};

export default GameRoomNav;
