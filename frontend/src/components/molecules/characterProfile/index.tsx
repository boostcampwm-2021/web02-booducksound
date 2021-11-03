import styled from '@emotion/styled';

import Character from '../../atoms/Character';
import StatusChip from '../../atoms/StatusChip';
import { PropsWithChildren } from 'react';
import theme from '../../../styles/theme';

interface props {
  color: string;
  name: string;
  status: 'king' | 'ready' | 'prepare';
}

const Container = styled.div`
  margin: 2%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Nav = styled.div`
  width: 20%;
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
    width: 10px;
    height: 10px;
  }
`;

const CharacterProfile = ({ color, name, status }: PropsWithChildren<props>) => {
  return (
    <Container>
      <ProfileContainer>
        <Character color={color} width={'100%'} />
      </ProfileContainer>
      <Nav>{name}</Nav>
      <Nav>
        <StatusChip status={status} />
      </Nav>
    </Container>
  );
};

export default CharacterProfile;
