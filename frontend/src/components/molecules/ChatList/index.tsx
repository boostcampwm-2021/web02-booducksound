import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import ChatComponent from '~/atoms/Chat';
import useSocket from '~/hooks/useSocket';
import theme from '~/styles/theme';
import { Chat } from '~/types/Chat';
import { SocketEvents } from '~/types/SocketEvents';
const Container = styled.div`
  width: 100%;
  height: 400px;
  display: grid;
  margin-right: auto;
  align-items: center;
  grid-auto-flow: row;
  grid-auto-rows: 5%; // play with this to change height of the children, 50% will fill half
  grid-template-columns: unset; // do not set template columns and rows
  grid-template-rows: unset;
  overflow: scroll;
  @media (max-width: ${theme.breakpoints.sm}) {
    height: 300px;
  }
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
