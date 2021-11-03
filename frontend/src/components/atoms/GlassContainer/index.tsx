import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import theme from '../../../styles/theme';

interface ContainerProps {
  type: string;
  ratio: string;
}

interface props {
  type: string;
}

const Container = styled.div<ContainerProps>`
  width: ${({ type }) => type};
  min-height: 15%;
  background-color: ${theme.colors.lightsky};
  margin: ${({ ratio }) => ratio};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 15%;
    width: ${({ type }) => type};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 45px;
    width: ${({ type }) => type};
  }
`;

//1920 568 946
const GlassContainer = ({ type, children }: PropsWithChildren<props>) => {
  return (
    <Container ratio={type === 'left' ? '1%' : '2%'} type={type === 'left' ? '60%' : '80%'}>
      {children}
    </Container>
  );
};

export default GlassContainer;
