import styled from '@emotion/styled';

const BoxContainer = styled.div`
  width: calc(100% - 8rem);
  min-height: calc(100vh - 4rem);
  box-shadow: 0px 4px 4px rgb(0 0 0 / 20%), 0px 4px 20px rgb(0 0 0 / 20%);
  padding: 4.8rem 4rem;
  border-radius: 100px;
  border-bottom: 15px solid #111;
  margin: 2rem 4rem;
  background-color: #fff;
`;

const PageBox = ({ children }: any) => {
  return <BoxContainer>{children}</BoxContainer>;
};

export default PageBox;
