import styled from '@emotion/styled';

import CharacterProfile from '~/molecules/CharacterProfile';
import theme from '~/styles/theme';
import { Player } from '~/types/Player';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
  padding: 16px;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const CharacterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  row-gap: 10px;
  overflow-x: auto;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    column-gap: 8px;
    padding: 0 4px;
  }
`;

const CharacterList = ({ players }: { players: { [socketId: string]: Player } }) => {
  return (
    <Container>
      <Title>사용자 목록</Title>
      <CharacterContainer>
        {Object.values(players).map((element, index) => (
          <CharacterProfile key={index} color={element.color} name={element.nickname} status={element.status} />
        ))}
      </CharacterContainer>
    </Container>
  );
};

export default CharacterList;
