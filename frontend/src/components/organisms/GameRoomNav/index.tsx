import styled from '@emotion/styled';

import Button from '~/atoms/Button';
import theme from '~/styles/theme';

const Container = styled.div`
  max-width: 1600px;
  width: 100%;
  display: grid;
  grid-template:
    'speaker . . .' 4fr
    ' . . start exit' 4fr
    ' . . . .' 1fr
    / 1fr 4fr 1fr 1fr;

  @media (max-width: ${theme.breakpoints.sm}) {
    display: grid;
    grid-template:
      'speaker . start exit' 4fr
      ' . . . .' 1fr
      / 1fr 4fr 1fr 1fr;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 8px 2px;
    column-gap: 4px;
  }
`;

const ButtonWrapper = styled.div`
  width: 80%;
  height: 100%;
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 10%;
  }
`;
const MuteButton = styled.button`
  border: 0;
  outline: 0;
  width: 60px;
  height: 60px;
  grid-area: speaker;
  background: url('images/ic_speaker.png') no-repeat center/45%;
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 30px;
    height: 30px;
  }
  &:hover {
    opacity: 50%;
  }
`;

interface ButtonContainerProps {
  background: string;
  content: string;
  fontSize?: number;
  type?: string;
}

const ResponsiveButton = ({ background, content, type }: ButtonContainerProps) => {
  return (
    <ButtonWrapper style={{ gridArea: type }}>
      <Button content={content} background={background}></Button>
    </ButtonWrapper>
  );
};

const GameRoomNav = () => {
  return (
    <Container>
      <MuteButton type="button" />
      <ResponsiveButton type={'start'} background={theme.colors.whitesmoke} fontSize={20} content={'START'} />
      <ResponsiveButton type={'exit'} background={theme.colors.sand} fontSize={20} content={'나가기'} />
    </Container>
  );
};
export default GameRoomNav;
