import styled from '@emotion/styled';

import GlassContainer from '../../atoms/GlassContainer';
import CharacterList from '../../molecules/CharacterList';
import ChatList from '../../molecules/ChatList';

interface Props {
  type: 'leftTitle' | 'rightTitle';
}

const Wrapper = styled.div`
  max-width: 1600px;
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template:
    'leftTitle . rightTitle' 1fr
    'leftCharacter . rightTitle' 1fr
    'leftCharacter . rightChat' 6fr
    'leftCharacter . rightSearch' 1fr
    / 4fr 1fr 6fr;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template:
      '.  leftCharacter leftCharacter leftCharacter .' 3fr
      '. leftTitle rightTitle rightTitle .' 2fr
      '. rightChat rightChat rightChat .' 8fr
      '. rightSearch rightSearch rightSearch .' 1fr
      / 1fr 3fr 1fr 6fr 1fr;
    font-size: 12px;
  }
`;

const TitleContainer = styled.div<Props>`
  grid-area: ${({ type }) => type};
`;

const ChatContainer = styled.div`
  grid-area: rightChat;
`;

const RoomStateTitle = styled.p`
  font-weight: bolder;
`;

const CharacterContainer = styled.div`
  grid-area: leftCharacter;
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

const GameRoomContainer = () => {
  return (
    <Wrapper>
      <TitleContainer type={'leftTitle'}>
        <GlassContainer>
          <RoomStateTitle>대기중 입니다.</RoomStateTitle>
        </GlassContainer>
      </TitleContainer>
      <CharacterContainer>
        <CharacterList />
      </CharacterContainer>
      <TitleContainer type={'rightTitle'}>
        <GlassContainer>대기중 입니다.</GlassContainer>
      </TitleContainer>
      <ChatContainer>
        <ChatList />
      </ChatContainer>
      <InputBox placeholder={'메세지를 입력해주세요.'} />
    </Wrapper>
  );
};

export default GameRoomContainer;
