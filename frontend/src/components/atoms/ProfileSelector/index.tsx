import { useState, PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import theme from '../../../styles/theme';
import Character from '../Character';

interface Props {
  type: string;
}

const getRandomHex = () => {
  return Math.floor(Math.random() * 255)
    .toString(16)
    .padStart(2, '0');
};

const ProfileContainer = styled.div<Props>`
  border-radius: 50%;
  border: 1px solid ${theme.colors.gray};
  max-width: ${({ type }) => (type === 'mypage' ? '120px' : '240px')};
  max-height: ${({ type }) => (type === 'mypage' ? '120px' : '240px')};
  width: ${({ type }) => (type === 'mypage' ? '12vw' : '24vw')};
  height: ${({ type }) => (type === 'mypage' ? '12vw' : '24vw')};
  margin: 0 auto 2.4rem auto;
  position: relative;
`;

const ChangeBtn = styled.span<Props>`
  border-radius: 50%;
  max-width: 80px;
  max-height: 80px;
  width: ${({ type }) => (type === 'mypage' ? '4vw' : '8vw')};
  height: ${({ type }) => (type === 'mypage' ? '4vw' : '8vw')};
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  border: 1px solid ${theme.colors.deepgray};
  background: #fff url('images/ic_shuffle.png') no-repeat center/45%;
`;

const ProfileSelector = ({ type }: PropsWithChildren<Props>) => {
  const [color, setColor] = useState('C9DAF8');

  const getRandomColor = () => {
    setColor(`${getRandomHex()}${getRandomHex()}${getRandomHex()}`);
  };

  return (
    <ProfileContainer type={type}>
      <Character width={'100%'} color={color}></Character>
      <ChangeBtn type={type} onClick={getRandomColor} />
    </ProfileContainer>
  );
};

export default ProfileSelector;
