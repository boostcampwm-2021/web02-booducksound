import styled from '@emotion/styled';
import type { NextPage } from 'next';

import GameRoomNav from '../../components/organisms/GameRoomNav';
import GameRoomContainer from '../../components/organisms/GameRoomContainer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 32px;
`;

const GameRoom: NextPage = () => {
  return (
    <Container>
      <GameRoomNav />
      <GameRoomContainer />
    </Container>
  );
};

export default GameRoom;
