import styled from '@emotion/styled';

interface Props {
  num: number;
}

const BoxTitle = styled.h2<Props>`
  text-align: left;
  font-size: 1.3rem;
  margin: 2.8rem 0 2rem 0;

  &::after {
    content: '총 ${({ num }) => num}개';
    letter-spacing: 1px;
    font-size: 0.95rem;
    display: inline-block;
    margin-left: 1rem;
    color: ${({ theme }) => theme.colors.ocean};
  }
`;

export default BoxTitle;
