import styled from '@emotion/styled';

import theme from '../../../styles/theme';

const BoxWrapper = styled.div`
  padding: 2rem 4rem;
`;

const BoxContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 4rem);
  box-shadow: 0px 4px 4px rgb(0 0 0 / 20%), 0px 4px 20px rgb(0 0 0 / 20%);
  padding: 4.8rem 4rem;
  border-radius: 100px;
  border-bottom: 15px solid #111;
  background-color: #fff;
`;

const PageBox = ({ children }: any) => {
  return (
    <BoxWrapper>
      <BoxContainer>{children}</BoxContainer>
    </BoxWrapper>
  );
};

export default PageBox;
