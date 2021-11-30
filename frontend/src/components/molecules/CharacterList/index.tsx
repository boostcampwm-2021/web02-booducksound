import styled from '@emotion/styled';

import useSocket from '~/hooks/useSocket';
import CharacterProfile from '~/molecules/CharacterProfile';
import { GameRoom } from '~/types/GameRoom';
import { Players } from '~/types/Players';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const CharactersContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  row-gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    height: 100%;
    align-items: center;
    column-gap: 8px;
    padding: 4px;
  }
`;

const CharacterList = ({
  players,
  status,
  roomNo,
}: {
  players: Players;
  status?: GameRoom['status'];
  roomNo: string | null;
}) => {
  const socket = useSocket();
  const newPlayers =
    status !== 'waiting' ? Object.entries(players).sort((a, b) => b[1].score - a[1].score) : Object.entries(players);

  return (
    <Container>
      <CharactersContainer>
        {players &&
          newPlayers.map((player, index) => (
            <CharacterProfile
              id={player[0]}
              type={!!(socket && players[socket.id]?.status === 'king' && status === 'waiting')}
              mode={status}
              key={index}
              color={player[1].color}
              name={player[1].nickname}
              status={player[1].status}
              skip={player[1].skip}
              answer={player[1].answer}
              score={player[1].score}
              roomNo={roomNo}
            />
          ))}
      </CharactersContainer>
    </Container>
  );
};

export default CharacterList;
