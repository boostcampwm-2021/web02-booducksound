import styled from '@emotion/styled';

import theme from '~/styles/theme';

const BoxWrapper = styled.div`
  padding: 5.6rem 2rem;
  animation: Tower 0.6s forwards;
  @keyframes Tower {
    from {
      margin-top: 999px;
    }
    to {
      margin-top: 0;
    }
  }
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  min-height: 80vh;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 20%), 0px 4px 20px rgb(0 0 0 / 20%);
  overflow-y: auto;
  padding: 4.8rem 4rem;
  margin: 0 auto;
  border-radius: 100px;
  border-bottom: 15px solid #111;
  background-color: #fff;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 3.6rem 3rem;
  }
`;

const PageBox = ({ children }: any) => {
  return (
    <BoxWrapper>
      <BoxContainer>{children}</BoxContainer>
    </BoxWrapper>
  );
};

export default PageBox;
