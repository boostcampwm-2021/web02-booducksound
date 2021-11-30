import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';

import styled from '@emotion/styled';

import InputText from '~/atoms/InputText';
import useSocket from '~/hooks/useSocket';
import { SocketEvents } from '~/types/SocketEvents';

type Props = {
  uuid: string | null;
  name: string;
  color: string;
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-area: rightSearch;
`;

const ChatInputText = styled(InputText)`
  border: 2px solid black;
  font-size: 1em;
  padding: 10px 24px;
  border-radius: 100px;
  box-shadow: 2px 2px 10px gray;
  width: 100%;
  outline: none;
`;

const GameRoomInputContainer = ({ uuid, name, color }: Props) => {
  const [chat, setChat] = useState('');
  const socket = useSocket();

  const handleChangeInputText: ChangeEventHandler = (e) => {
    setChat((e.target as HTMLInputElement).value);
  };
  const handlePressEnter: KeyboardEventHandler = () => {
    if (!socket || !uuid || !chat) return;
    socket.emit(SocketEvents.SEND_CHAT, uuid, name, chat, color);
    setChat('');
  };

  return (
    <InputContainer>
      <ChatInputText
        value={chat}
        className="chatText"
        isSearch={false}
        placeholder="메시지를 입력하세요."
        handleChange={handleChangeInputText}
        handleEnter={handlePressEnter}
      ></ChatInputText>
    </InputContainer>
  );
};

export default GameRoomInputContainer;
