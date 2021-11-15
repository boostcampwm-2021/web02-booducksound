import styled from '@emotion/styled';

import theme from '~/styles/theme';

interface props {
  name: string;
  text: string;
  status: 'alert' | 'message' | 'answer';
  color?: string;
}

const Message = styled.p`
  width: 100%;
  word-wrap: break-word;
`;

const Name = styled.span`
  color: ${({ color }) => `#${color}` || '#000'};
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
`;

const Content = styled.span`
  font-weight: 400;
  color: ${theme.colors.night};
`;

const AlertMessage = styled.p`
  color: ${theme.colors.ocean};
`;

const Chat = ({ name, text, status, color }: props) => {
  console.log('컬러', color);

  return (
    <>
      {status === 'message' ? (
        <Message>
          <Name color={color}>{name}: </Name>
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
