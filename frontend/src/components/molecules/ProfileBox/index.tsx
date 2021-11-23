import styled from '@emotion/styled';
import Link from 'next/link';
import Router from 'next/router';

import { requestLogout } from '~/api/account';
import UserInfoBox from '~/molecules/UserInfoBox';
import theme from '~/styles/theme';

import ResponsiveButton from '../ResponsiveButton';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid ${theme.colors.gray};

  @media (max-width: ${theme.breakpoints.sm}) {
    display: block;
  }
`;
const ProfileBtnBox = styled.div`
  display: flex;
  column-gap: 4px;
  text-align: right;

  > a {
    text-decoration: auto;
    margin-right: 0.6rem;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 16px;
    padding: 12px 0;

    > a {
      display: block;
      margin-right: 0;
    }

    > a > button {
      font-size: 1rem;
      margin: 0 0 0.4rem 0;
    }
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    button {
      padding: 8px 0;
      width: 100%;
      display: block;
      margin: 0 auto 1rem auto;
    }
  }
`;
type Info = {
  id: string;
  nickname: string;
  userColor: string;
};

const ProfileBox = ({ info }: { info: Info }) => {
  const { id, nickname, userColor } = info;

  const handleLogout = async () => {
    await requestLogout();
    Router.push('/');
  };

  return (
    <Wrapper>
      <UserInfoBox info={{ id, nickname, userColor }} />
      <ProfileBtnBox>
        {id && (
          <Link href="/findPwd">
            <a>
              <ResponsiveButton
                background={theme.colors.lime}
                fontSize="16px"
                width="168px"
                height="60px"
                mdFontSize="14px"
                mdWidth="102px"
                mdHeight="38px"
                smFontSize="14px"
                smWidth="100px"
                smHeight="38px"
              >
                비밀번호 변경
              </ResponsiveButton>
            </a>
          </Link>
        )}
        <ResponsiveButton
          background={theme.colors.lightsky}
          fontSize="16px"
          width="168px"
          height="60px"
          mdFontSize="14px"
          mdWidth="102px"
          mdHeight="38px"
          smFontSize="14px"
          smWidth="100px"
          smHeight="38px"
          onClick={handleLogout}
        >
          로그아웃
        </ResponsiveButton>
      </ProfileBtnBox>
    </Wrapper>
  );
};

export default ProfileBox;
