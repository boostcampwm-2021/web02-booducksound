import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { getUser } from '~/actions/user';
import { changeColor } from '~/api/user';
import ProfileSelector from '~/atoms/ProfileSelector';
import useDebounce from '~/hooks/useDebounce';

const Container = styled.div`
  display: flex;
  align-items: center;
`;
const UserInfo = styled.div`
  padding: 0 2rem;
  /* margin-bottom: 2.4rem; */
  text-align: left;

  .user-name {
    font-size: 1.2rem;
    line-height: 2rem;
  }

  .user-id {
    color: ${({ theme }) => theme.colors.gray};
  }
`;
type Info = {
  id: string;
  nickname: string;
  userColor: string;
};

const UserInfoBox = ({ info }: { info: Info }) => {
  const { id, nickname, userColor } = info;
  const [color, setColor] = useState(userColor);
  const debouncedColor = useDebounce(color, 700);
  const dispatch = useDispatch();

  const handleClickChangeBtn = (value: string) => setColor(value);

  useEffect(() => {
    if (!debouncedColor) return;
    changeColor(id, debouncedColor);
    dispatch(getUser());
  }, [debouncedColor]);

  useEffect(() => {
    if (!userColor) return;
    setColor(userColor);
  }, [userColor]);

  return (
    <Container>
      <ProfileSelector type="mypage" color={color} setColor={handleClickChangeBtn}></ProfileSelector>
      <UserInfo>
        <p className="user-name">{nickname}</p>
        <p className="user-id">{id || '비회원'}</p>
      </UserInfo>
    </Container>
  );
};

export default UserInfoBox;
