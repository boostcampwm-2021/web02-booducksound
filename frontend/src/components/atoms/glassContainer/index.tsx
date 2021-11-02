import styled from '@emotion/styled';
import theme from '../../../styles/theme';

import { PropsWithChildren } from 'react';
const Container = styled.div`
  width: 100%;
  padding: 1%;
  background-color: ${theme.colors.lightsky};
`;
const GlassContainer = () => {
  return <Container></Container>;
};

export default GlassContainer;
