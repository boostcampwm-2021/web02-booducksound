import { useEffect, useState } from 'react';

import ChatComponent from '~/atoms/Chat';
import useSocket from '~/hooks/useSocket';
import { Chat } from '~/types/Chat';
import { SocketEvents } from '~/types/SocketEvents';

const ChatList = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const socket = useSocket();

  useEffect(() => {
    socket?.on(SocketEvents.RECEIVE_CHAT, ({ name, text, status, color }: Chat) => {
      setChatList((v) => [...v, { name, text, status, color }]);
    });

    socket?.on(SocketEvents.RECEIVE_ANSWER, ({ name, text, status }: Chat) => {
      setChatList((v) => [...v, { name, text, status }]);
      socket?.emit(SocketEvents.NEXT_ROUND);
    });
  }, []);

  return (
    <>
      {chatList.map((element: Chat, index: number) => (
        <ChatComponent key={index} {...element} />
      ))}
    </>
  );
};

export default ChatList;
