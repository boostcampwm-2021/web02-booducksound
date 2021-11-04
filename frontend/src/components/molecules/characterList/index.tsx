import styled from '@emotion/styled';

import GlassContainer from '../../atoms/GlassContainer';
import CharacterProfile from '../CharacterProfile';
import theme from '../../../styles/theme';

const Title = styled.p`
  margin-right: auto;
`;
const Container = styled.div`
  width: 100%;
  margin-right: auto;
`;
const CharacterList = ({ children }: any) => {
  const dummy = [
    { color: 'ff', name: 'max', status: 'king' },
    { color: 'dwff', name: 'john', status: 'ready' },
    { color: 'dw1121', name: 'ben', status: 'prepare' },
    { color: '234def', name: 'dd', status: 'ready' },
    { color: '234def', name: 'dd', status: 'ready' },
    { color: '234def', name: 'dd', status: 'ready' },
    { color: '234def', name: 'dd', status: 'ready' },
    { color: '234def', name: 'dd', status: 'ready' },
  ];
  return (
    <GlassContainer type={'left'} mode={'detail'}>
      <Title>사용자 목록</Title>
      <Container>
        {dummy.map((element, index) => (
          <CharacterProfile key={index} color={element.color} name={element.name} status={element.status} />
        ))}
      </Container>
    </GlassContainer>
  );
};

export default CharacterList;
