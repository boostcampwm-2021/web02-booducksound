import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import ChatComponent from '~/atoms/Chat';
import useSocket from '~/hooks/useSocket';
import { Chat } from '~/types/Chat';
import { SocketEvents } from '~/types/SocketEvents';

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: auto;
`;

const ChatList = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const socket = useSocket();

  useEffect(() => {
    socket?.on(SocketEvents.RECEIVE_CHAT, ({ name, text, status }: Chat) => {
      setChatList((v) => [...v, { name, text, status }]);
    });
  }, []);

  return (
    <Container>
      {chatList.map((element: Chat, index: number) => (
        <ChatComponent key={index} name={element.name} text={element.text} status={element.status} />
      ))}
    </Container>
  );
};

export default ChatList;
