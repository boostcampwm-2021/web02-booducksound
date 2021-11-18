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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
  font-size: 16px;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
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
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  color: ${theme.colors.gray};
  font-size: 1.1em;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.8em;
  }
`;
const MidContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  /* @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
  } */
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
          <Character color={color} width={'100%'} />
        </ProfileCircle>
      </ProfileContainer>
      <MidContainer>
        <Name>{name}</Name>
        {mode === 'playing' && <Name> / {score}</Name>}
      </MidContainer>
      {mode === 'waiting' && <ChipContainer>{<StatusChip status={skip ? 'skip' : status} />}</ChipContainer>}
    </Container>
  );
};

export default CharacterProfile;
