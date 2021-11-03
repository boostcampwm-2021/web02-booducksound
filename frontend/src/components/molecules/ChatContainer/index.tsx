import styled from '@emotion/styled';
import GlassContainer from '../../atoms/GlassContainer';
import Chat from '../../atoms/Chat';
const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: auto;
`;

const ChatContainer = () => {
  const dummy = [
    { name: 'max', text: '', status: 'alert' },
    { name: 'john', text: '', status: 'alert' },
    { name: 'max', text: '안녕', status: 'message' },
    { name: 'john', text: '안녕', status: 'message' },
    { name: 'max', text: '', status: 'alert' },
    { name: 'john', text: '', status: 'alert' },
    { name: 'max', text: '안녕', status: 'message' },
    { name: 'john', text: '안녕', status: 'message' },
    { name: 'max', text: '', status: 'alert' },
    { name: 'john', text: '', status: 'alert' },
    { name: 'max', text: '안녕', status: 'message' },
    { name: 'john', text: '안녕', status: 'message' },
    { name: 'max', text: '', status: 'alert' },
    { name: 'john', text: '', status: 'alert' },
    { name: 'max', text: '안녕', status: 'message' },
    { name: 'john', text: '안녕', status: 'message' },
    { name: 'max', text: '', status: 'alert' },
    { name: 'john', text: '', status: 'alert' },
    { name: 'max', text: '안녕', status: 'message' },
    { name: 'john', text: '안녕', status: 'message' },
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
