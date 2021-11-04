import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import theme from '../../../styles/theme';

// interface ContainerProps {
//   type: '60%' | '80%';
//   mode: '15%' | '60%';
//   ratio: string;
// }

const Container = styled.div`
  background-color: ${theme.colors.lightsky};
  display: flex;
  width: 100%;
  height: 100%;
  padding: 2%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 1920 568 946
const GlassContainer = ({ children }: any) => {
  return <Container>{children}</Container>;
};

export default GlassContainer;
