import { MouseEventHandler, PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import Character from '~/atoms/Character';
import Portal from '~/atoms/Portal';
import theme from '~/styles/theme';
import { GameRoom } from '~/types/GameRoom';

interface ModalContainerProps {
  height?: string;
  maxWidth?: string;
}

const McCharacter = styled.div`
  background: url(images/ic_booduck.png) no-repeat center bottom/contain;
  position: absolute;
  width: 5em;
  height: 5em;
  top: 0;
  left: 0;
  animation: rotate_image 4s linear infinite;

  @keyframes rotate_image {
    100% {
      transform: rotateY(360deg);
    }
  }
`;

const Title = styled.div`
  text-align: center;
  font-weight: bolder;
  margin: 10px 10px 20px 10px;
`;
const Like = styled.div`
  font-size: 30px;
  text-align: center;
  font-weight: bolder;
  margin: 10px 10px 20px 10px;
  &:hover {
    opacity: 50%;
  }
`;
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.68);
  width: 100vw;
  height: 100vh;
`;

const ModalContainer = styled.div<ModalContainerProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: ${({ maxWidth }) => maxWidth || '640px'};
  height: ${({ height }) => height || '72vh'};
  padding: 32px;
  background: #fff;
  border-radius: 32px;
  z-index: 99;
`;

const ModalWrapper = styled.div`
  overflow: auto;
  width: 100%;
  height: 80%;
`;

const Container = styled.div`
  background-color: ${theme.colors.sky};
  padding: 10px 20px 10px 20px;
  border: 1px solid;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
  font-size: 16px;
  margin: 10px 0px 10px 0px;
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
`;

const ProfileContainer = styled.div`
  flex: 0 0 60px;
  width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: none;
    width: auto;
  }
`;

const ProfileCircle = styled.div`
  border-radius: 50%;
  border: 1px solid ${theme.colors.gray};
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 28px;
    height: 28px;
  }
`;

const Name = styled.p`
  white-space: nowrap;
  overflow: hidden;
  font-size: 1.2em;
`;

const ResultModal = ({ gameRoom }: { gameRoom: GameRoom | undefined }) => {
  const addLikeCount = () => {};
  return (
    <Portal>
      <ModalBackground />
      <ModalContainer height={'480px'} maxWidth={'540px'}>
        <McCharacter />
        <Title>결과 공지</Title>
        <ModalWrapper>
          {gameRoom !== undefined &&
            Object.keys(gameRoom?.players).map((element, index) => (
              <Container key={index}>
                <ProfileContainer>
                  <ProfileCircle>
                    <Character color={gameRoom.players[element].color} width={'100%'} />
                  </ProfileCircle>
                </ProfileContainer>
                <Name>{gameRoom.players[element].nickname}</Name>
                <Name>{gameRoom.players[element].score}</Name>
              </Container>
            ))}
        </ModalWrapper>
        <Like onClick={addLikeCount}>👍🏻</Like>
      </ModalContainer>
    </Portal>
  );
};

export default ResultModal;
