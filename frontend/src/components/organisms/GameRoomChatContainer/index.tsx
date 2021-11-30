import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';

import ChatComponent from '~/atoms/Chat';
import GlassContainer from '~/atoms/GlassContainer';
import { CHAT_BLOCK_SIZE } from '~/constants/index';
import useSocketOn from '~/hooks/useSocketOn';
import { Chat } from '~/types/Chat';
import { SocketEvents } from '~/types/SocketEvents';

type Props = {
  type: 'leftTitle' | 'rightTitle' | 'leftCharacter' | 'rightChat';
};

type OptimizeChat = {
  allChat: Chat[];
  subChat: Chat[];
};

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
  const [chatList, setChatList] = useState<OptimizeChat>({ allChat: [], subChat: [] });
  const chatListContainer = useRef<HTMLDivElement>(null);
  const [topRef, isTopInView] = useInView();

  const scorllToBottom = () => {
    if (!chatListContainer.current) return;
    chatListContainer.current.scrollTo({ top: chatListContainer.current.scrollHeight, behavior: 'smooth' });
  };

  const updateChat =
    ({ name, text, status, color }: Chat) =>
    (prevState: OptimizeChat) => {
      const newChat = { name, text, status, color };
      const newState = { ...prevState };
      if (prevState.subChat.length >= CHAT_BLOCK_SIZE) {
        newState.subChat.shift();
      }
      newState.subChat.push(newChat);
      newState.allChat.push(newChat);
      return newState;
    };

  const addSubChat = (prevState: OptimizeChat) => {
    const newState = { ...prevState };
    const start = newState.allChat.length - newState.subChat.length - CHAT_BLOCK_SIZE;
    const end = newState.allChat.length;
    newState.subChat = newState.allChat.slice(start < 0 ? 0 : start, end);
    return newState;
  };

  useEffect(() => {
    if (!isTopInView) return;
    if (chatList.subChat.length < CHAT_BLOCK_SIZE) return;
    setChatList(addSubChat);
    if (!chatListContainer.current || chatList.allChat.length === chatList.subChat.length) return;
    const chatGap = chatList.allChat.length - chatList.subChat.length;
    const numOfAddedChat = chatGap >= CHAT_BLOCK_SIZE ? CHAT_BLOCK_SIZE : chatGap;
    const CHAT_LINE_HEIGHT = 16;
    chatListContainer.current.scrollTo(0, numOfAddedChat * CHAT_LINE_HEIGHT);
  }, [isTopInView]);

  useSocketOn(SocketEvents.RECEIVE_CHAT, ({ name, text, status, color }: Chat) => {
    setChatList(updateChat({ name, text, status, color }));
    scorllToBottom();
  });

  useSocketOn(SocketEvents.RECEIVE_ANSWER, ({ name, text, status }: Chat) => {
    setChatList(updateChat({ name, text, status }));
    scorllToBottom();
  });

  return (
    <ChatListContainer type="rightChat" ref={chatListContainer}>
      <ul>
        {chatList.subChat.map((element: Chat, i: number) => (
          <li ref={!i ? topRef : null} key={i}>
            <ChatComponent {...element} />
          </li>
        ))}
      </ul>
    </ChatListContainer>
  );
};

export default GameRoomChatContainer;
