import { useRef, useState } from 'react';

import styled from '@emotion/styled';

import GlassContainer from '~/atoms/GlassContainer';
import useSocketOn from '~/hooks/useSocketOn';
import ChatList from '~/molecules/ChatList';
import { Chat } from '~/types/Chat';
import { SocketEvents } from '~/types/SocketEvents';

interface Props {
  type: 'leftTitle' | 'rightTitle' | 'leftCharacter' | 'rightChat';
}

const Container = styled(GlassContainer)<Props>`
  grid-area: ${({ type }) => type};
`;
const ChatListContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  row-gap: 2px;
  padding: 20px 20px 10px 20px;
  overflow-y: scroll;
`;

const GameRoomChatContainer = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const chatListContainer = useRef<HTMLDivElement>(null);

  const scorllToBottom = () => {
    if (!chatListContainer.current) return;
    chatListContainer.current.scrollTo({ top: chatListContainer.current.scrollHeight, behavior: 'smooth' });
  };
  useSocketOn(SocketEvents.RECEIVE_CHAT, ({ name, text, status, color }: Chat) => {
    setChatList((v) => [...v, { name, text, status, color }]);
    scorllToBottom();
  });

  useSocketOn(SocketEvents.RECEIVE_ANSWER, ({ name, text, status }: Chat) => {
    setChatList((v) => [...v, { name, text, status }]);
    scorllToBottom();
  });

  return (
    <ChatListContainer type={'rightChat'} ref={chatListContainer}>
      <ChatList chatList={chatList} />
    </ChatListContainer>
  );
};

export default GameRoomChatContainer;
