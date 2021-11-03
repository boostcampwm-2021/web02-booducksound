import styled from '@emotion/styled';
import type { NextPage } from 'next';

import theme from '../../styles/theme';
import Button from '../../components/atoms/Button';
import CharacterList from '../../components/molecules/characterList';
import GlassContainer from '../../components/atoms/GlassContainer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 32px;
`;
const Wrapper = styled.div`
  max-width: 1600px;
  width: 100%;
`;
const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 8px;
  column-gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 8px 4px;
    row-gap: 6px;
    column-gap: 6px;
    flex-wrap: wrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 8px 2px;
    column-gap: 4px;
  }
`;

const NavItem = styled.div`
  display: flex;
  height: fit-content;
  column-gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    column-gap: 6px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    column-gap: 4px;
  }
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
const ButtonWrapper = styled.div`
  width: 180px;
  height: 100%;
  font-size: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 110px;
    font-size: 12px;
  }
`;
const MuteButton = styled.button`
  border: 0;
  outline: 0;
  width: 5%;
  height: 3vh;
  background: url('images/ic_speaker.png') no-repeat center/45%;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 10%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 10%;
  }
  &:hover {
    opacity: 50%;
  }
`;

const ChatContainer = styled.div`
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

const RoomStateTitle = styled.p`
  font-weight: bolder;
`;

const CharacterListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 70vh;
  font-size: 20px;
  /* background-color: antiquewhite; */

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 8px 4px;
    row-gap: 6px;
    column-gap: 6px;
    flex-wrap: wrap;
    font-size: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 8px 2px;
    column-gap: 4px;
    font-size: 12px;
  }
`;

interface ButtonContainerProps {
  background: string;
  content: string;
  fontSize?: number;
}

const ResponsiveButton = ({ background, content }: ButtonContainerProps) => {
  return (
    <ButtonWrapper>
      <Button content={content} background={background}></Button>
    </ButtonWrapper>
  );
};

const GameRoom: NextPage = () => {
  return (
    <Container>
      <Wrapper>
        <Nav>
          <NavItem>
            <MuteButton type="button" />
          </NavItem>
          <NavItem style={{ justifyContent: 'flex-end' }}>
            <ResponsiveButton background={theme.colors.whitesmoke} fontSize={20} content={'START'} />
            <ResponsiveButton background={theme.colors.sand} fontSize={20} content={'나가기'} />
          </NavItem>
        </Nav>
      </Wrapper>
      <Wrapper style={{ display: 'flex' }}>
        <CharacterListContainer>
          <GlassContainer type={'left'}>
            <RoomStateTitle>대기중 입니다.</RoomStateTitle>
          </GlassContainer>
          <CharacterList></CharacterList>
        </CharacterListContainer>
        <ChatContainer>
          <GlassContainer type={'right'}>대기중 입니다.</GlassContainer>
          <GlassContainer type={'right'}>대기중 입니다.</GlassContainer>
          <InputBox placeholder={'메세지를 입력해주세요.'} />
        </ChatContainer>
      </Wrapper>
    </Container>
  );
};

export default GameRoom;
