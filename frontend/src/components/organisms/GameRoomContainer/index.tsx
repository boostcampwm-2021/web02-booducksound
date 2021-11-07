import styled from '@emotion/styled';

import theme from '../../../styles/theme';
import GlassContainer from '../../atoms/GlassContainer';
import CharacterList from '../../molecules/CharacterList';
import ChatList from '../../molecules/ChatList';

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

const GameRoomContainer = () => {
  return (
    <Wrapper>
      <Container type={'leftTitle'}>
        <RoomStateTitle>대기중 입니다.</RoomStateTitle>
      </Container>
      <Container type={'leftCharacter'}>
        <CharacterList />
      </Container>
      <Container type={'rightTitle'}>대기중 입니다.</Container>
      <Container type={'rightChat'}>
        <ChatList />
      </Container>
      <InputBox placeholder={'메세지를 입력해주세요.'} />
    </Wrapper>
  );
};

export default GameRoomContainer;
