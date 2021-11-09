import { useState } from 'react';

import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import GlassContainer from '~/atoms/GlassContainer';
import useSocket from '~/hooks/useSocket';
import CharacterList from '~/molecules/CharacterList';
import ChatList from '~/molecules/ChatList';
import { RootState } from '~/reducers/index';
import theme from '~/styles/theme';
import { GameRoom } from '~/types/GameRoom';
import { Player } from '~/types/Player';
import { SocketEvents } from '~/types/SocketEvents';

interface Props {
  type: 'leftTitle' | 'rightTitle' | 'leftCharacter' | 'rightChat';
}

const Wrapper = styled.div`
  max-width: 1600px;
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template:
    '. leftTitle . rightTitle .' 1fr
    '. leftCharacter . rightTitle .' 1fr
    '. leftCharacter . rightChat .' 6fr
    '. leftCharacter . rightSearch .' 1fr
    /1fr 6fr 1fr 8fr 1fr;
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template:
      '.  leftCharacter leftCharacter leftCharacter .' 3fr
      '. leftTitle rightTitle rightTitle .' 2fr
      '. rightChat rightChat rightChat .' 8fr
      '. rightSearch rightSearch rightSearch .' 1fr
      / 1fr 3fr 1fr 6fr 1fr;
    font-size: 12px;
  }
`;

const Container = styled(GlassContainer)<Props>`
  grid-area: ${({ type }) => type};
`;
const GridDiv = styled.div`
  width: 100%;
  height: 100%;
  gap: 10px;
  display: grid;
  grid-template:
    '. . title setting .' 1fr
    '. description description description . ' 1fr
    /1fr 1fr 3fr 1fr 1fr;
`;
const GameTitle = styled.div`
  align-self: center;
  justify-self: center;
  grid-area: title;
`;

const SettingButton = styled.button`
  grid-area: setting;
  border: 0;
  outline: 0;
  width: 60px;
  height: 60px;
  background: url('images/settings.png') no-repeat center/45%;
`;

const RoomStateTitle = styled.p`
  font-weight: bolder;
`;

const InputBox = styled.input`
  grid-area: rightSearch;
  border: 2px solid black;
  padding: 0px 10%;
  display: flex;

  font-size: 20px;
  border-radius: 100px;
  box-shadow: 2px 2px 10px gray;
  background-color: white;
`;

const GameRoomContainer = ({
  players,
  gameRoom,
}: {
  players: { [socketId: string]: Player };
  gameRoom: GameRoom | undefined;
}) => {
  const socket = useSocket();
  const { uuid } = useSelector((state: RootState) => state.room);
  const userInfo = useSelector((state: any) => state.user);
  const [text, setText] = useState<string>('');
  const send = () => {
    if (text !== '') {
      socket?.emit(SocketEvents.SEND_CHAT, uuid, userInfo.nickname, text);
      setText('');
    }
  };

  return (
    <Wrapper>
      <Container type={'leftTitle'}>
        <RoomStateTitle>대기중 입니다.</RoomStateTitle>
      </Container>
      <Container type={'leftCharacter'}>
        <CharacterList players={players} />
      </Container>
      <Container type={'rightTitle'}>
        <GridDiv>
          <GameTitle>{gameRoom?.title}</GameTitle>
          <SettingButton />
        </GridDiv>
      </Container>
      <Container type={'rightChat'}>
        <ChatList />
      </Container>
      <InputBox
        placeholder={'메세지를 입력해주세요.'}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onClick={send}
      />
    </Wrapper>
  );
};

export default GameRoomContainer;
