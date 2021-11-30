import { useState, useEffect } from 'react';

import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import GlassContainer from '~/atoms/GlassContainer';
import useSocket from '~/hooks/useSocket';
import useSocketOn from '~/hooks/useSocketOn';
import CharacterList from '~/molecules/CharacterList';
import GamePlaySummary from '~/molecules/GamePlaySummary';
import OptionModal from '~/organisms/OptionModal';
import { RootState } from '~/reducers/index';
import { GameRoom } from '~/types/GameRoom';
import { Players } from '~/types/Players';
import { SocketEvents } from '~/types/SocketEvents';

import GameRoomChatContainer from '../GameRoomChatContainer';
import GameRoomInputContainer from '../GameRoomInputContainer';

type Props = {
  type: 'leftTitle' | 'rightTitle' | 'leftCharacter' | 'rightChat';
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  row-gap: 8px;
  column-gap: 64px;
  font-size: 16px;
  padding-bottom: 128px;

  grid-template:
    'leftTitle rightTitle' 2fr
    'leftCharacter rightTitle' 1fr
    'leftCharacter rightChat' 10fr
    'leftCharacter rightSearch' 1fr
    / 348px 1fr;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    column-gap: 28px;

    grid-template:
      'leftTitle rightTitle' 2fr
      'leftCharacter rightTitle' 1fr
      'leftCharacter rightChat' 10fr
      'leftCharacter rightSearch' 1fr
      / 300px 1fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template:
      'leftTitle leftTitle leftTitle' 1fr
      'leftCharacter leftCharacter leftCharacter' 1fr
      'rightTitle rightTitle rightTitle' 2fr
      'rightChat rightChat rightChat' 6fr
      'rightSearch rightSearch rightSearch' 1fr
      / 3fr 1fr 6fr;

    font-size: 14px;
    padding-bottom: 62px;
  }
`;

const Container = styled(GlassContainer)<Props>`
  grid-area: ${({ type }) => type};
`;

const CharacterContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  padding: 16px 4px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 4px;
  }
`;

const RightTitle = styled.div`
  position: relative;
  display: flex;
  row-gap: 16px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameSummary = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 16px;
  }
`;

const Bold = styled.b`
  color: ${({ theme }) => theme.colors.ocean};
`;

const Hint = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};

  &::before {
    content: '힌트 : ';
    color: ${({ theme }) => theme.colors.ocean};
    margin-right: 8px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 16px;
  }
`;

const LeftTitleContainer = styled(Container)`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 16px;
  font-size: 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 16px;
  }
`;

const RoomTitle = styled.h3`
  width: 100%;
  font-size: 1em;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const PlaylistName = styled.h4`
  width: 100%;
  font-size: 1em;
  line-height: 1.5;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const SettingButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  outline: 0;
  width: 48px;
  height: 48px;
  background: url('images/settings.png') no-repeat center/45%;
  cursor: pointer;
`;

const GameRoomContainer = ({ gameRoom, endTime }: { gameRoom: GameRoom; endTime: number }) => {
  const { uuid } = useSelector((state: RootState) => state.room);
  const userInfo = useSelector((state: RootState) => state.user);
  const [modalOnOff, setModalOnOff] = useState<boolean>(false);
  const [hint, setHint] = useState('');
  const socket = useSocket();

  const { players } = gameRoom;

  const confirmKing = () => {
    if (!socket || !players?.[socket.id]) return false;
    if (players[socket.id].status !== 'king') return false;
    return true;
  };

  useSocketOn(SocketEvents.SHOW_HINT, (hint: string) => {
    setHint(hint);
  });

  useEffect(() => {
    setHint('');
  }, [gameRoom?.status, gameRoom?.curRound]);

  return (
    <>
      <Wrapper>
        <LeftTitleContainer type="leftTitle">
          <RoomTitle>{gameRoom?.title}</RoomTitle>
          <PlaylistName>{gameRoom?.playlistName}</PlaylistName>
          {gameRoom?.status === 'waiting' && confirmKing() && <SettingButton onClick={() => setModalOnOff(true)} />}
        </LeftTitleContainer>
        <CharacterContainer type="leftCharacter">
          <CharacterList players={players as Players} status={gameRoom?.status} roomNo={uuid} />
        </CharacterContainer>
        <Container type="rightTitle">
          <RightTitle>
            {gameRoom.status === 'waiting' && (
              <GameSummary>
                <Bold>대기중</Bold>입니다.
              </GameSummary>
            )}
            {gameRoom.status !== 'waiting' && <GamePlaySummary gameRoom={gameRoom} endTime={endTime} />}
            {gameRoom.status !== 'waiting' && hint && <Hint>{hint}</Hint>}
            {gameRoom.status !== 'waiting' && !hint && (
              <GameSummary>
                <Bold>음악</Bold>을 듣고 <Bold>답</Bold>을 입력하세요.
              </GameSummary>
            )}
          </RightTitle>
        </Container>
        <GameRoomChatContainer></GameRoomChatContainer>
        <GameRoomInputContainer color={userInfo.color} name={userInfo.nickname} uuid={uuid}></GameRoomInputContainer>
      </Wrapper>
      {modalOnOff && gameRoom && (
        <OptionModal setModalOnOff={setModalOnOff} leftButtonText="수정하기" gameRoom={gameRoom} />
      )}
    </>
  );
};

export default GameRoomContainer;
