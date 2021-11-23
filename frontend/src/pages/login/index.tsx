/* eslint-disable @next/next/link-passhref */
import { useState } from 'react';

import styled from '@emotion/styled';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getUser } from '~/actions/user';
import { requestLogin } from '~/api/account';
import Button from '~/atoms/Button';
import InputText from '~/atoms/InputText';
import MenuInfoBox from '~/atoms/MenuInfoBox';
import PageBox from '~/atoms/PageBox';
import { ID_EMPTY_MSG, LOGIN_SUCC_MSG, PASSWORD_EMPTY_MSG } from '~/constants/index';
import theme from '~/styles/theme';

const LoginContainer = styled.div`
  position: fixed;
  width: calc(100vw - 8rem);
  height: max-content;
  margin: auto;
  text-align: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const SearchPwdBtn = styled.a`
  color: ${theme.colors.deepgray};
  text-align: center;
  margin-top: 1.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: 0 auto;

  > * {
    margin: 0 auto 0.8rem auto;
  }

  a {
    margin-top: 2rem;
    display: block;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    > * {
      width: 100%;
    }
    button {
      width: 90%;
      font-size: 20px;
      padding: 20px 0;
    }
  }
`;

const LoginInputText = styled(InputText)`
  width: 100%;
  font-size: 20px;
  padding: 24px 20px 24px 80px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 18px;
    padding: 24px 40px 24px 40px;
  }
`;

const Login: NextPage = () => {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!id) return toast.error(ID_EMPTY_MSG);
    if (!password) return toast.error(PASSWORD_EMPTY_MSG);
    const res = await requestLogin(id, password);
    if (res) {
      dispatch(getUser());
      toast.info(LOGIN_SUCC_MSG);
      Router.push('/lobby');
    }
  };

  return (
    <>
      <MenuInfoBox name="로그인" />
      <PageBox>
        <LoginContainer>
          <InputContainer>
            <LoginInputText
              className="loginId"
              isSearch={false}
              placeholder="아이디를 입력하세요."
              value={id}
              handleChange={({ target }) => setID((target as HTMLInputElement).value.trim())}
            ></LoginInputText>
            <LoginInputText
              className="loginPassword"
              type="password"
              isSearch={false}
              placeholder="비밀번호를 입력하세요."
              value={password}
              handleChange={({ target }) => setPassword((target as HTMLInputElement).value.trim())}
            ></LoginInputText>
            <Button
              width={'560px'}
              background={theme.colors.sky}
              fontSize={'30px'}
              paddingH={'24px'}
              onClick={handleLogin}
            >
              로그인
            </Button>
            <Link href="/findPwd">
              <SearchPwdBtn href="#none">비밀번호를 잊어버리셨나요?</SearchPwdBtn>
            </Link>
          </InputContainer>
        </LoginContainer>
      </PageBox>
    </>
  );
};

export default Login;
