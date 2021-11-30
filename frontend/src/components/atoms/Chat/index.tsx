import styled from '@emotion/styled';

type Props = {
  name: string;
  text: string;
  status: 'alert' | 'message' | 'answer';
  color?: string;
};

const Message = styled.p`
  width: 100%;
  word-wrap: break-word;
`;

const Name = styled.span`
  color: ${({ color }) => `#${color}` || '#000'};
  text-shadow: 0 1px #000, 1px 0 #000;
`;

const Content = styled.span`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.night};
`;

const AlertMessage = styled.p`
  color: ${({ theme }) => theme.colors.ocean};
`;

const Chat = ({ name, text, status, color }: Props) => {
  if (status === 'message')
    return (
      <Message>
        <Name color={color}>{name}: </Name>
        <Content>{text}</Content>
      </Message>
    );

  if (status === 'alert') return <AlertMessage>{name + text}</AlertMessage>;

  return (
    <AlertMessage>
      {name}님께서 정답을 맞추셨습니다. {text}
    </AlertMessage>
  );
};

export default Chat;
