import styled from '@emotion/styled';

import Character from '~/atoms/Character';
import { Player } from '~/types/Player';

const ProfileContainer = styled.div`
  flex: 0 0 100px;
  width: 0;
`;

const ProfileCircle = styled.div`
  position: relative;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: flex-end;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.mint};
  width: 50px;
  height: 50px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
  font-size: 16px;
  min-width: 60px;
  position: relative;
  padding: 4px 8px;

  &:nth-of-type(-n + 3) ${ProfileCircle}::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -14px;
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 99;
  }

  &:nth-of-type(1) ${ProfileCircle} {
    & {
      border-color: ${({ theme }) => theme.colors.yellow};
    }

    &::after {
      background-image: url('/images/gold-medal.svg');
    }
  }

  &:nth-of-type(2) ${ProfileCircle} {
    & {
      border-color: ${({ theme }) => theme.colors.gray};
    }

    &::after {
      background-image: url('/images/silver-medal.svg');
    }
  }

  &:nth-of-type(3) ${ProfileCircle} {
    & {
      border-color: ${({ theme }) => theme.colors.peach};
    }

    &::after {
      background-image: url('/images/bronze-medal.svg');
    }
  }
`;

const Name = styled.p`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  font-size: 18px;
  text-align: right;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 14px;
  }
`;

const Point = styled(Name)`
  flex: 0 0 100px;
  width: 0;
  color: ${({ theme }) => theme.colors.deepgray};
  font-size: 16px;

  &::before {
    content: '포인트 : ';
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 14px;
  }
`;

const ResultCharacter = ({ player }: { player: Player }) => {
  return (
    <Container>
      <ProfileContainer>
        <ProfileCircle>
          <Character color={player.color} width="90%" />
        </ProfileCircle>
      </ProfileContainer>
      <Name>{player.nickname}</Name>
      <Point>{player.score}</Point>
    </Container>
  );
};

export default ResultCharacter;
