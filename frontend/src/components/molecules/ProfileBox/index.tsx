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

  @media (max-width: ${theme.breakpoints.sm}) {
    display: block;
  }
`;
const ProfileBtnBox = styled.div`
  text-align: right;

  > a {
    text-decoration: auto;
    margin-right: 1rem;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 16px;
    padding: 12px 0;

    > a {
      margin: 0;
    }

    > a > button {
      margin: 0 0 1rem 0;
    }
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    button {
      padding: 8px 0;
      font-size: 0.85rem;
      width: 90%;
      display: block;
      margin: 0 auto 1rem auto !important;
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
