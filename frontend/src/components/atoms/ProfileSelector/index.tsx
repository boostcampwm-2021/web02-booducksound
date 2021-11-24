import styled from '@emotion/styled';

import Character from '~/atoms/Character';
import theme from '~/styles/theme';

interface Props {
  type?: string;
  color: string;
  setColor: any;
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
  width: ${({ type }) => (type === 'mypage' ? '14vw' : '24vw')};
  height: ${({ type }) => (type === 'mypage' ? '14vw' : '24vw')};
  position: relative;
  margin-bottom: 1rem;
`;

const ChangeBtn = styled.span<Props>`
  border-radius: 50%;
  max-width: ${({ type }) => (type === 'mypage' ? '40px' : '80px')};
  max-height: ${({ type }) => (type === 'mypage' ? '40px' : '80px')};
  width: ${({ type }) => (type === 'mypage' ? '5vw' : '8vw')};
  height: ${({ type }) => (type === 'mypage' ? '5vw' : '8vw')};
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  border: 1px solid ${theme.colors.deepgray};
  background: #fff url('images/ic_shuffle.png') no-repeat center/45%;
`;

const ProfileSelector = ({ type, color, setColor }: Props) => {
  const getRandomColor = () => {
    setColor(`${getRandomHex()}${getRandomHex()}${getRandomHex()}`);
  };

  return (
    <ProfileContainer type={type} color={color} setColor={setColor}>
      <Character width={'100%'} color={color}></Character>
      <ChangeBtn type={type} onClick={getRandomColor} color={color} setColor={setColor} />
    </ProfileContainer>
  );
};

export default ProfileSelector;
