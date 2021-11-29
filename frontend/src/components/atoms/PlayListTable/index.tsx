import styled from '@emotion/styled';

const PlayListTable = styled.table`
  margin: 0;
  width: 100%;

  > li {
    .play-title {
      font-weight: 600;
      font-size: 1.2rem;
    }
  }

  tr:not(.no-result) {
    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.lightsky};
    }

    > td {
      vertical-align: middle;
      padding: 0.5rem 1rem;
    }
  }
`;

export default PlayListTable;
