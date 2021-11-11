import styled from '@emotion/styled';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch } from 'react-redux';

import { requestLogout } from '~/api/account';
import Button from '~/atoms/Button';
import UserInfoBox from '~/molecules/UserInfoBox';
import theme from '~/styles/theme';
import { UserActions } from '~/types/Actions';

const Warper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${theme.colors.gray};

  > div:first-of-type {
    flex-grow: 0;
  }

  > div:last-child {
    flex-grow: 1;
  }

  @media (max-width: 480px) {
    display: block;
  }
`;
const ProfileBtnBox = styled.div`
  text-align: right;

  @media (min-width: 768px) {
    margin-bottom: 1rem;

    > *:first-of-type {
      margin-right: 1rem;
    }
  }

  @media (max-width: 768px) {
    button {
      margin-bottom: 0.4rem;
    }
  }
  @media (max-width: 480px) {
    margin-bottom: 1rem;

    button {
      padding: 8px 0;
      font-size: 0.8rem;
      width: 90%;
      display: block;
      margin: 0 auto 0.4rem auto;
    }
  }
`;
type Info = {
  id: string;
  nickname: string;
  userColor: string;
};

const ProfileBox = ({ info, handleUserMenu }: { info: Info; handleUserMenu: Function }) => {
  const { id, nickname, userColor } = info;
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await requestLogout();
    dispatch({ type: UserActions.REMOVE_USER });
    Router.push('/');
  };

  return (
    <Warper>
      <UserInfoBox info={{ id, nickname, userColor }} />
      <ProfileBtnBox>
        {handleUserMenu(
          id,
          <Link href="/findPwd">
            <a>
              <Button background={theme.colors.lime} fontSize={'16px'} paddingH={'16px'} width={'160px'}>
                비밀번호 변경
              </Button>
            </a>
          </Link>,
        )}
        <Button
          background={theme.colors.lightsky}
          fontSize={'16px'}
          paddingH={'16px'}
          width={'160px'}
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </ProfileBtnBox>
    </Warper>
  );
};

export default ProfileBox;
