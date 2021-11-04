import styled from '@emotion/styled';

import GlassContainer from '../../atoms/GlassContainer';
import CharacterContainer from '../../molecules/CharacterContainer';
import ChatContainer from '../../molecules/ChatContainer';

const Wrapper = styled.div`
  max-width: 1600px;
  width: 100%;
`;

const InputBox = styled.input`
  border: 2px solid black;

  padding: 0px 10%;
  display: flex;
  width: 80%;
  height: 60px;
  font-size: 20px;
  border-radius: 100px;
  box-shadow: 2px 2px 10px gray;
  background-color: white;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 80%;
    height: 30px;
    font-size: 6px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 70vh;
  font-size: 20px;
  /* background-color: darkblue; */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    row-gap: 6px;
    column-gap: 6px;
    flex-wrap: wrap;
    font-size: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    column-gap: 4px;
    font-size: 12px;
  }
`;

const GameRoomContainer = () => {
  return (
    <Wrapper style={{ display: 'flex' }}>
      <CharacterContainer />
      <Container>
        <GlassContainer type={'right'} mode={'title'}>
          대기중 입니다.
        </GlassContainer>
        <ChatContainer />
        <InputBox placeholder={'메세지를 입력해주세요.'} />
      </Container>
    </Wrapper>
  );
};

export default GameRoomContainer;
