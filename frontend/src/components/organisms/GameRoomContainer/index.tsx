import { KeyboardEventHandler, useState, useRef, useEffect } from 'react';

import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import GlassContainer from '~/atoms/GlassContainer';
import Timer from '~/atoms/Timer';
import useSocket from '~/hooks/useSocket';
import useSocketOn from '~/hooks/useSocketOn';
import CharacterList from '~/molecules/CharacterList';
import ChatList from '~/molecules/ChatList';
import OptionModal from '~/organisms/OptionModal';
import { RootState } from '~/reducers/index';
import theme from '~/styles/theme';
import { Chat } from '~/types/Chat';
import { GameRoom } from '~/types/GameRoom';
import { Player } from '~/types/Player';
import { Players } from '~/types/Players';
import { SocketEvents } from '~/types/SocketEvents';

interface Props {
  type: 'leftTitle' | 'rightTitle' | 'leftCharacter' | 'rightChat';
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  row-gap: 12px;
  column-gap: 64px;
  font-size: 16px;
  padding-bottom: 128px;

  grid-template:
    'leftTitle rightTitle' 2fr
    'leftCharacter rightTitle' 1fr
    'leftCharacter rightChat' 10fr
    'leftCharacter rightSearch' 1fr
    / 348px 1fr;

  @media (max-width: ${theme.breakpoints.lg}) {
    column-gap: 28px;

    grid-template:
      'leftTitle rightTitle' 2fr
      'leftCharacter rightTitle' 1fr
      'leftCharacter rightChat' 10fr
      'leftCharacter rightSearch' 1fr
      / 300px 1fr;
  }

  @media (max-width: ${theme.breakpoints.md}) {
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

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 4px;
  }
`;

const ChatListContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  row-gap: 2px;
  padding: 20px 20px 10px 20px;
  overflow-y: scroll;
`;

const RightTitle = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameSummary = styled.p`
  line-height: 2.4rem;

  > b {
    color: ${theme.colors.ocean};
  }
`;

const Round = styled(GameSummary)`
  font-size: 18px;

  &::after {
    content: 'Round';
    margin-left: 8px;
  }
`;

const Hint = styled(GameSummary)`
  &::before {
    content: '힌트 : ';
    margin-right: 8px;
  }
`;

const LeftTitleContainer = styled(Container)`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 16px;
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-area: rightSearch;
`;

const Input = styled.input`
  border: 2px solid black;
  font-size: 1em;
  padding: 10px 24px;
  border-radius: 100px;
  box-shadow: 2px 2px 10px gray;
  width: 100%;
  outline: none;
`;

const TimerWrapper = styled.div`
  position: absolute;
  top: -24px;
  left: -28px;
  width: 100px;
  height: 100px;
  font-size: 28px;
  font-weight: 700;

  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: 24px;
    top: -20px;
    left: -20px;
    width: 84px;
    height: 84px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    position: fixed;
    font-size: 24px;
    width: 64px;
    height: 64px;
    top: 52px;
    left: 12px;
    transform: translate(0, 0);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 18px;
    width: 58px;
    height: 58px;
  }
`;

const gameStatusSummary = (gameRoom?: GameRoom) => {
  if (!gameRoom) return;

  const { status, curRound, maxRound } = gameRoom;

  switch (status) {
    case 'playing':
    case 'resting': {
      return (
        <>
          <TimerWrapper>
            <Timer initSec={gameRoom.timePerProblem} resetTrigger={gameRoom.curRound} />
          </TimerWrapper>
          <Round>
            {curRound} / {maxRound}
          </Round>
          <GameSummary>
            <b>음악</b>을 듣고 <b>답</b>을 입력하세요.
          </GameSummary>
        </>
      );
    }
    default: {
      return (
        <GameSummary>
          <b>대기중</b>입니다.
        </GameSummary>
      );
    }
  }
};

const GameRoomContainer = ({
  players,
  gameRoom,
}: {
  players?: { [socketId: string]: Player };
  gameRoom: GameRoom | undefined;
}) => {
  const { uuid } = useSelector((state: RootState) => state.room);
  const userInfo = useSelector((state: RootState) => state.user);
  const [modalOnOff, setModalOnOff] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [hint, setHint] = useState('');
  const chatListContainer = useRef<HTMLDivElement>(null);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const socket = useSocket();

  const handlePressEnter: KeyboardEventHandler = (e) => {
    if (e.key !== 'Enter') return;
    if (!text.trim()) return;

    socket?.emit(SocketEvents.SEND_CHAT, uuid, userInfo.nickname, text, userInfo.color);
    setText('');
  };

  const scorllToBottom = () => {
    if (!chatListContainer.current) return;
    chatListContainer.current.scrollTo({ top: chatListContainer.current.scrollHeight, behavior: 'smooth' });
  };

  const confirmKing = () => {
    if (!socket || !players?.[socket.id]) return false;
    if (players[socket.id].status !== 'king') return false;
    return true;
  };

  useSocketOn(SocketEvents.RECEIVE_CHAT, ({ name, text, status, color }: Chat) => {
    setChatList((v) => [...v, { name, text, status, color }]);
    scorllToBottom();
  });

  useSocketOn(SocketEvents.RECEIVE_ANSWER, ({ name, text, status }: Chat) => {
    setChatList((v) => [...v, { name, text, status }]);
    scorllToBottom();
  });

  useSocketOn(SocketEvents.SHOW_HINT, (hint: string) => {
    setHint(hint);
  });

  useEffect(() => {
    setHint('');
  }, [gameRoom?.curRound]);

  return (
    <>
      <Wrapper>
        <LeftTitleContainer type={'leftTitle'}>
          <RoomTitle>{gameRoom?.title}</RoomTitle>
          <PlaylistName>{gameRoom?.playlistName}</PlaylistName>
          {gameRoom?.status === 'waiting' && confirmKing() && <SettingButton onClick={() => setModalOnOff(true)} />}
        </LeftTitleContainer>
        <CharacterContainer type={'leftCharacter'}>
          <CharacterList players={players as Players} status={gameRoom?.status} roomNo={uuid} />
        </CharacterContainer>
        <Container type={'rightTitle'}>
          <RightTitle>
            {gameStatusSummary(gameRoom)}
            {gameRoom?.status === 'playing' && hint && <Hint>{hint}</Hint>}
          </RightTitle>
        </Container>
        <ChatListContainer type={'rightChat'} ref={chatListContainer}>
          <ChatList chatList={chatList} />
        </ChatListContainer>
        <InputContainer>
          <Input
            value={text}
            placeholder="메시지를 입력하세요"
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handlePressEnter}
          />
        </InputContainer>
      </Wrapper>
      {modalOnOff && gameRoom && (
        <OptionModal setModalOnOff={setModalOnOff} leftButtonText={'수정하기'} gameRoom={gameRoom} />
      )}
    </>
  );
};

export default GameRoomContainer;
