import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import Character from '~/atoms/Character';
import StatusChip from '~/atoms/StatusChip';
import theme from '~/styles/theme';

interface Props {
  color: string;
  name: string;
  status: 'king' | 'ready' | 'prepare';
  skip: boolean;
}

const Container = styled.div<any>`
  margin: 2%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
  opacity: ${({ status }) => (status === 'prepare' ? `50%` : `100%`)};
`;

const ChipContainer = styled.div`
  width: 20%;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 20px;
    font-size: 8px;
  }
`;

const ProfileContainer = styled.div`
  border-radius: 50%;
  border: 1px solid ${theme.colors.gray};
  width: 40px;
  height: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 10px;
    height: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const CharacterProfile = ({ color, name, status, skip }: PropsWithChildren<Props>) => {
  return (
    <Container status={status}>
      <ProfileContainer>
        <Character color={color} width={'100%'} />
      </ProfileContainer>
      {name}
      <ChipContainer>
        <StatusChip status={status} />
      </ChipContainer>
      {skip && (
        <ChipContainer>
          <StatusChip status={'skip'} />
        </ChipContainer>
      )}
    </Container>
  );
};

export default CharacterProfile;
