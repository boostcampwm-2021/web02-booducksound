import styled from '@emotion/styled';

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(/images/spinner.svg);
`;

const Spinner = ({ ...props }) => {
  return <SpinnerContainer {...props} />;
};

export default Spinner;
