import styled from '@emotion/styled';

import CharacterProfile from '~/molecules/CharacterProfile';
import theme from '~/styles/theme';
import { GameRoom } from '~/types/GameRoom';
import { Players } from '~/types/Players';

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

const CharacterList = ({ players, status }: { players: Players; status: GameRoom['status'] | undefined }) => {
  const handleExpulsion = () => {};
  return (
    <Container>
      <Title>사용자 목록</Title>
      <CharacterContainer>
        {players &&
          (status === 'playing'
            ? Object.values(players).sort((a, b) => (a.score < b.score ? 1 : -1))
            : Object.values(players)
          ).map((element, index) => (
            <CharacterProfile
              mode={status}
              key={index}
              color={element.color}
              name={element.nickname}
              status={element.status}
              skip={element.skip}
              score={element.score}
            />
          ))}
      </CharacterContainer>
    </Container>
  );
};

export default CharacterList;
