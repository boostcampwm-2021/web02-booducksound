import { useEffect } from 'react';

import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import GameRoomContainer from '../../components/organisms/GameRoomContainer';
import GameRoomNav from '../../components/organisms/GameRoomNav';
import { RootState } from '../../reducers';
import { SocketEvents } from '../../types/SocketEvents';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 32px;
`;

const GameRoom: NextPage = () => {
  const { uuid } = useSelector((state: RootState) => state.room);
  const router = useRouter();

  useEffect(() => {
    // TODO : 닉네임, 부덕이 색깔 등이 설정되어 있지 않으면(로그인 하지 않았다면) 설정 페이지로 보낼 것

    if (!uuid) {
      router.push('/lobby');
    }
  }, []);

  return (
    <Container>
      <GameRoomNav />
      <GameRoomContainer />
    </Container>
  );
};

export default GameRoom;
