import styled from '@emotion/styled';
import theme from '../../../styles/theme';
import Button from '../../atoms/Button';

const Container = styled.div`
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

const GameRoomNav = () => {
  return (
    <Container>
      <Nav>
        <NavItem>
          <MuteButton type="button" />
        </NavItem>
        <NavItem style={{ justifyContent: 'flex-end' }}>
          <ResponsiveButton background={theme.colors.whitesmoke} fontSize={20} content={'START'} />
          <ResponsiveButton background={theme.colors.sand} fontSize={20} content={'나가기'} />
        </NavItem>
      </Nav>
    </Container>
  );
};
export default GameRoomNav;
