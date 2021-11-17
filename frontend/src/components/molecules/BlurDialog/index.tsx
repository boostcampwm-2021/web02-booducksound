import styled from '@emotion/styled';

import Portal from '~/atoms/Portal';
import theme from '~/styles/theme';

const Container = styled.div`
  position: fixed;
  top: -9999px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.68);
  padding: 24px;
  color: ${theme.colors.white};
  font-size: 28px;
  animation: drop 4s;

  @keyframes drop {
    0% {
      top: -9999px;
    }

    15%,
    85% {
      top: 50%;
    }

    to {
      top: -9999px;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 20px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 16px;
  }
`;

const Title = styled.h4`
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 24px;
  word-break: keep-all;
`;

const Content = styled.p`
  text-align: center;
  font-size: 1em;
`;

const BlurDialog = ({ title, content }: { title: string; content: string }) => {
  return (
    <Portal>
      <Container>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </Container>
    </Portal>
  );
};

export default BlurDialog;
