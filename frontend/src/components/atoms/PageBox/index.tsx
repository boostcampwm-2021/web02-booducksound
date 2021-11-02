import styled from '@emotion/styled';

const BoxWrapper = styled.div`
  padding: 5.6rem 2rem;
`;

const BoxContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  min-height: calc(100vh - 11.2rem);
  box-shadow: 0px 4px 4px rgb(0 0 0 / 20%), 0px 4px 20px rgb(0 0 0 / 20%);
  padding: 4.8rem 4rem;
  margin: 0 auto;
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
