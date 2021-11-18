import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import Character from '~/atoms/Character';
import StatusChip from '~/atoms/StatusChip';
import theme from '~/styles/theme';
import { GameRoom } from '~/types/GameRoom';

interface Props {
  mode: GameRoom['status'] | undefined;
  color: string;
  name: string;
  status: 'king' | 'ready' | 'prepare';
  skip: boolean;
  score: number;
}

const ProfileContainer = styled.div`
  flex: 0 0 60px;
  width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: none;
    width: auto;
  }
`;

const ProfileCircle = styled.div`
  background: ${theme.colors.white};
  border-radius: 50%;
  border: 2px solid ${theme.colors.mint};
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 28px;
    height: 28px;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
  font-size: 16px;

  &:nth-child(-n + 3)::after {
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

  &:nth-child(1) {
    &::after {
      background-image: url('/images/gold-medal.svg');
    }

    ${ProfileCircle} {
      border-color: ${theme.colors.yellow};
    }
  }

  &:nth-child(2) {
    &::after {
      background-image: url('/images/silver-medal.svg');
    }

    ${ProfileCircle} {
      border-color: ${theme.colors.gray};
    }
  }

  &:nth-child(3) {
    &::after {
      background-image: url('/images/bronze-medal.svg');
    }

    ${ProfileCircle} {
      border-color: ${theme.colors.peach};
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
`;

const Name = styled.p`
  white-space: nowrap;
  overflow: hidden;
  font-size: 1.2em;
`;

const MidContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const ChipContainer = styled.div`
  flex: 0 0 60px;
  width: 0;
  font-size: 0.8em;
  text-align: right;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: none;
    width: auto;
  }
`;

const CharacterProfile = ({ mode, color, name, status, skip, score }: PropsWithChildren<Props>) => {
  return (
    <Container>
      <ProfileContainer>
        <ProfileCircle>
          <Character color={color} width={'90%'} />
        </ProfileCircle>
      </ProfileContainer>
      <MidContainer>
        <Name>{name}</Name>
        {mode === 'playing' && <Name>{score}</Name>}
      </MidContainer>
      {mode === 'waiting' && (
        <ChipContainer>
          <StatusChip status={status} />
        </ChipContainer>
      )}

      {skip && (
        <ChipContainer>
          <StatusChip status={'skip'} />
        </ChipContainer>
      )}
    </Container>
  );
};

export default CharacterProfile;
