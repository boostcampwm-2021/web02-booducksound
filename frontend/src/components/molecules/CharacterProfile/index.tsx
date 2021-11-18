import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import Character from '~/atoms/Character';
import StatusChip from '~/atoms/StatusChip';
import theme from '~/styles/theme';
import { GameRoom } from '~/types/GameRoom';

interface Props {
  id: string;
  mode: GameRoom['status'] | undefined;
  color: string;
  name: string;
  status: 'king' | 'ready' | 'prepare';
  skip: boolean;
  score: number;
  type: boolean;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
  font-size: 16px;
  position: relative;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    min-width: 60px;
  }

  &:hover > .btn_list {
    display: block;
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
  text-align: right;
`;

const Point = styled(Name)`
  color: ${theme.colors.deepgray};
  line-height: 1.8;

  &::before {
    content: '포인트 : ';
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

const BtnList = styled.div`
  display: none;
  position: absolute;
  right: 0;
  text-align: center;

  @media (max-width: ${theme.breakpoints.md}) {
    right: auto;
    bottom: 0;
  }
`;

const KingBtn = styled.button`
  font-size: 0.64rem;
  cursor: pointer;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.deepgray};
  border-radius: 4px;

  &:first-child {
    margin: 0 0.2rem 0 0;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    &:first-child {
      margin: 0 0 0.1rem 0;
    }
  }
`;

const CharacterProfile = ({ id, mode, color, name, status, skip, score, type }: PropsWithChildren<Props>) => {
  const handleDelegate = (option: boolean) => (id: string) => {
    if (option) {
      console.log('방장위임');
    } else {
      console.log('강퇴');
    }
  };
  return (
    <Container>
      <ProfileContainer>
        <ProfileCircle>
          <Character color={color} width={'100%'} />
        </ProfileCircle>
      </ProfileContainer>
      <MidContainer>
        <Name>{name}</Name>
        {mode === 'playing' && <Point>{score}</Point>}
      </MidContainer>
      {mode === 'waiting' && <ChipContainer>{<StatusChip status={skip ? 'skip' : status} />}</ChipContainer>}
      {status !== 'king' && type && (
        <BtnList className="btn_list">
          <KingBtn onClick={() => handleDelegate(true)(id)}>방장위임</KingBtn>
          <KingBtn onClick={() => handleDelegate(false)(id)}>강퇴</KingBtn>
        </BtnList>
      )}
    </Container>
  );
};

export default CharacterProfile;
