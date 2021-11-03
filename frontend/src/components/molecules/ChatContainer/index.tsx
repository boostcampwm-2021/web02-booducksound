import styled from '@emotion/styled';
import GlassContainer from '../../atoms/GlassContainer';
import Chat from '../../atoms/Chat';
const Container = styled.div`
  margin-right: auto;
`;

const ChatContainer = () => {
  const dummy = [
    { name: 'max', text: '', status: 'alert' },
    { name: 'john', text: '', status: 'alert' },
    { name: 'max', text: '안녕', status: 'message' },
    { name: 'john', text: '안녕', status: 'message' },
  ];

  return (
    <GlassContainer type={'right'} mode={'detail'}>
      <Container>
        {dummy.map((element, index) => (
          <Chat key={index} name={element.name} text={element.text} status={element.status} />
        ))}
      </Container>
    </GlassContainer>
  );
};

export default ChatContainer;
