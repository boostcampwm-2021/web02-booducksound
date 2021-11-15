import { useEffect, useState } from 'react';

import ChatComponent from '~/atoms/Chat';
import useSocket from '~/hooks/useSocket';
import { Chat } from '~/types/Chat';
import { SocketEvents } from '~/types/SocketEvents';

const ChatList = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const socket = useSocket();

  useEffect(() => {
    socket?.on(SocketEvents.RECEIVE_CHAT, ({ name, text, status }: Chat) => {
      setChatList((v) => [...v, { name, text, status }]);
    });
  }, []);

  return (
    <>
      {chatList.map((element: Chat, index: number) => (
        <ChatComponent key={index} name={element.name} text={element.text} status={element.status} />
      ))}
    </>
  );
};

export default ChatList;
