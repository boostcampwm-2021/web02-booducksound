import styled from '@emotion/styled';

import GlassContainer from '../../atoms/GlassContainer';
import CharacterList from '../CharacterList';

const RoomStateTitle = styled.p`
  font-weight: bolder;
`;

const CharacterListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 70vh;
  font-size: 20px;
  /* background-color: antiquewhite; */

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 8px 4px;
    row-gap: 6px;
    column-gap: 6px;
    flex-wrap: wrap;
    font-size: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 8px 2px;
    column-gap: 4px;
    font-size: 12px;
  }
`;

const CharacterContainer = () => {
  return (
    <CharacterListContainer>
      <GlassContainer type={'left'} mode={'title'}>
        <RoomStateTitle>대기중 입니다.</RoomStateTitle>
      </GlassContainer>
      <CharacterList />
    </CharacterListContainer>
  );
};

export default CharacterContainer;
