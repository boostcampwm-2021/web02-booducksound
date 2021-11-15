import styled from '@emotion/styled';

import theme from '~/styles/theme';

interface props {
  name: string;
  text: string;
  status: 'alert' | 'message';
}

const Message = styled.p``;
const AlertMessage = styled.p`
  color: ${theme.colors.ocean};
`;

const Chat = ({ name, text, status }: props) => {
  return (
    <>
      {status === 'message' ? (
        <Message>
          {name}:{text}
        </Message>
      ) : status === 'answer' ? (
        <AlertMessage>{name} 님께서 정답을 맞추셨습니다.</AlertMessage>
      ) : (
        <AlertMessage>{name} 님께서 입장하셨습니다.</AlertMessage>
      )}
    </>
  );
};

export default Chat;
