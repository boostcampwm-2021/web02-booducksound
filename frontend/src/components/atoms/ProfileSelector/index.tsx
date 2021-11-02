import { useState } from 'react';

import styled from '@emotion/styled';

import theme from '../../../styles/theme';
import Character from '../Character';

const getRandomHex = () => {
  return Math.floor(Math.random() * 255)
    .toString(16)
    .padStart(2, '0');
};

const ProfileContainer = styled.div`
  border-radius: 50%;
  border: 1px solid ${theme.colors.gray};
  max-width: 240px;
  max-height: 240px;
  width: 24vw;
  height: 24vw;
  margin: 0 auto 2.4rem auto;
  position: relative;
`;

const ChangeBtn = styled.span`
  border-radius: 50%;
  max-width: 80px;
  max-height: 80px;
  width: 8vw;
  height: 8vw;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  border: 1px solid ${theme.colors.deepgray};
  background: #fff url('images/ic_shuffle.png') no-repeat center/45%;
`;

const ProfileSelector = () => {
  const [color, setColor] = useState('C9DAF8');

  const getRandomColor = () => {
    setColor(`${getRandomHex()}${getRandomHex()}${getRandomHex()}`);
  };

  return (
    <ProfileContainer>
      <Character width={'100%'} color={color}></Character>
      <ChangeBtn onClick={getRandomColor} />
    </ProfileContainer>
  );
};

export default ProfileSelector;
