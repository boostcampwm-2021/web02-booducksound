import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import Character from '~/atoms/Character';
import StatusChip from '~/atoms/StatusChip';
import theme from '~/styles/theme';

interface Props {
  color: string;
  name: string;
  status: 'king' | 'ready' | 'prepare';
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Name = styled.p`
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 12px;
  }
`;

const ChipContainer = styled.div`
  flex-shrink: 0;
  font-size: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 8px;
  }
`;

const ProfileContainer = styled.div`
  border-radius: 50%;
  border: 1px solid ${theme.colors.gray};
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  /* @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 10px;
    height: 10px;
  } */

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 24px;
    height: 24px;
  }
`;

const CharacterProfile = ({ color, name, status }: PropsWithChildren<Props>) => {
  return (
    <Container>
      <ProfileContainer>
        <Character color={color} width={'100%'} />
      </ProfileContainer>
      <Name>{name}</Name>
      <ChipContainer>
        <StatusChip status={status} />
      </ChipContainer>
    </Container>
  );
};

export default CharacterProfile;
