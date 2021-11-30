import styled from '@emotion/styled';

import theme from '~/styles/theme';

type Props = {
  status: 'king' | 'ready' | 'prepare' | 'skip';
};

const chipColor = {
  king: theme.colors.orange,
  ready: theme.colors.ocean,
  prepare: theme.colors.lilac,
  skip: theme.colors.black,
};

const statusKorean = {
  king: '방장',
  ready: '준비완료',
  prepare: '준비중',
  skip: 'SKIP',
};

const Chip = styled.div<Props>`
  display: inline-block;
  border: 1px solid ${({ status }) => chipColor[status]};
  border-radius: 4px;
  font-size: inherit;
  color: ${({ status }) => chipColor[status]};
  padding: 2px 6px;
  white-space: nowrap;
`;

const StatusChip = ({ status }: Props) => {
  return <Chip status={status}>{statusKorean[status]}</Chip>;
};

export default StatusChip;
