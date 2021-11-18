import styled from '@emotion/styled';

import useSocket from '~/hooks/useSocket';
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

const CharactersContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  row-gap: 10px;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    column-gap: 8px;
    padding: 0 4px;
  }
`;

const CharacterList = ({ players, status }: { players: Players; status?: GameRoom['status'] }) => {
  const socket = useSocket();
  return (
    <Container>
      <Title>사용자 목록</Title>
      <CharactersContainer>
        {players &&
          (status === 'playing'
            ? Object.entries(players).sort((a, b) => (a[1].score < b[1].score ? 1 : -1))
            : Object.entries(players)
          ).map((element, index) => (
            <CharacterProfile
              id={element[0]}
              type={!!(socket && players[socket.id]?.status === 'king' && status === 'waiting')}
              mode={status}
              key={index}
              color={element[1].color}
              name={element[1].nickname}
              status={element[1].status}
              skip={element[1].skip}
              score={element[1].score}
            />
          ))}
      </CharactersContainer>
    </Container>
  );
};

export default CharacterList;
