import styled from '@emotion/styled';

import CharacterProfile from '~/molecules/CharacterProfile';
import theme from '~/styles/theme';
import { Player } from '~/types/Player';

const Title = styled.p`
  margin-right: auto;
`;
const Container = styled.div``;
const CharacterContainer = styled.div`
  width: 100%;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: row;
    overflow: auto;
    justify-content: space-between;
  }
`;

const CharacterList = ({ players }: { players: { [socketId: string]: Player } }) => {
  return (
    <>
      <Title>사용자 목록</Title>
      <CharacterContainer>
        {Object.values(players).map((element, index) => (
          <CharacterProfile
            key={index}
            color={element.color}
            name={element.nickname}
            status={element.status}
            skip={element.skip}
          />
        ))}
      </CharacterContainer>
    </>
  );
};

export default CharacterList;
