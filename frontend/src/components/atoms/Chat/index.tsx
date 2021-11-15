import styled from '@emotion/styled';

import theme from '~/styles/theme';

interface props {
  name: string;
  text: string;
  status: 'alert' | 'message';
}

const Message = styled.p``;

const Name = styled.span`
  font-weight: 600;
`;

const Content = styled.span`
  font-weight: 400;
`;

const AlertMessage = styled.p`
  color: ${theme.colors.ocean};
`;

const Chat = ({ name, text, status }: props) => {
  return (
    <>
      {status === 'message' ? (
        <Message>
          <Name>{name}: </Name>
          <Content>{text}</Content>
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
