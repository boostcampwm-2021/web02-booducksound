import { KeyboardEventHandler, useState, useRef, useEffect } from 'react';

import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import GlassContainer from '~/atoms/GlassContainer';
import useSocket from '~/hooks/useSocket';
import useSocketOn from '~/hooks/useSocketOn';
import CharacterList from '~/molecules/CharacterList';
import ChatList from '~/molecules/ChatList';
import GamePlaySummary from '~/molecules/GamePlaySummary';
import OptionModal from '~/organisms/OptionModal';
import { RootState } from '~/reducers/index';
import theme from '~/styles/theme';
import { Chat } from '~/types/Chat';
import { GameRoom } from '~/types/GameRoom';
import { Players } from '~/types/Players';
import { SocketEvents } from '~/types/SocketEvents';

interface Props {
  type: 'leftTitle' | 'rightTitle' | 'leftCharacter' | 'rightChat';
}

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
  color: ${theme.colors.black};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 16px;
  }
`;

const Bold = styled.b`
  color: ${theme.colors.ocean};
`;

const Hint = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: ${theme.colors.black};

  &::before {
    content: '힌트 : ';
    color: ${theme.colors.ocean};
    margin-right: 8px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
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

  @media (max-width: ${theme.breakpoints.md}) {
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

const GameRoomContainer = ({ gameRoom, endTime }: { gameRoom: GameRoom; endTime: number }) => {
  const { uuid } = useSelector((state: RootState) => state.room);
  const userInfo = useSelector((state: RootState) => state.user);
  const [modalOnOff, setModalOnOff] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [hint, setHint] = useState('');
  const chatListContainer = useRef<HTMLDivElement>(null);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const socket = useSocket();

  const { players } = gameRoom;

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
  }, [gameRoom?.status]);

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
