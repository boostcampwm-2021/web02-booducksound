import styled from '@emotion/styled';

import CharacterProfile from '~/molecules/CharacterProfile';
import theme from '~/styles/theme';

const Title = styled.p`
  margin-right: auto;
`;
const Container = styled.div`
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
interface props {
  color: string;
  name: string;
  status: 'king' | 'ready' | 'prepare';
}

const CharacterList = () => {
  const dummy: props[] = [
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
    <>
      <Title>사용자 목록</Title>
      <Container>
        {dummy.map((element, index) => (
          <CharacterProfile key={index} color={element.color} name={element.name} status={element.status} />
        ))}
      </Container>
    </>
  );
};

export default CharacterList;
