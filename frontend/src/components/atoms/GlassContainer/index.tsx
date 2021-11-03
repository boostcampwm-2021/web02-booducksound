import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import theme from '../../../styles/theme';

interface ContainerProps {
  type: 'left' | 'right';
  mode: 'title' | 'detail';
  ratio: string;
}

interface props {
  type: 'left' | 'right';
  mode: 'title' | 'detail';
}

const Container = styled.div<ContainerProps>`
  width: ${({ type }) => type};
  min-height: ${({ mode }) => mode};

  background-color: ${theme.colors.lightsky};
  margin: ${({ ratio }) => ratio};
  display: flex;
  padding: 2%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: ${({ mode }) => mode};
    width: ${({ type }) => type};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: ${({ mode }) => mode};
    width: ${({ type }) => type};
  }
`;

//1920 568 946
const GlassContainer = ({ type, mode, children }: PropsWithChildren<props>) => {
  return (
    <Container
      ratio={type === 'left' ? '1%' : '2%'}
      type={type === 'left' ? '60%' : '80%'}
      mode={mode === 'title' ? '15%' : '60%'}
    >
      {children}
    </Container>
  );
};

export default GlassContainer;
