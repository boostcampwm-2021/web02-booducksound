import { useState } from 'react';

import styled from '@emotion/styled';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';

import Button from '../../components/atoms/Button';
import InputBox from '../../components/atoms/InputBox';
import MenuInfoBox from '../../components/atoms/MenuInfoBox';
import PageBox from '../../components/atoms/PageBox';
import ProfileSelector from '../../components/atoms/ProfileSelector';
import theme from '../../styles/theme';
import { ID_EMPTY_MSG, PASSWORD_EMPTY_MSG, headers, getToken, setToken } from '../login';

export const NICKNAME_EMPTY_MSG = '닉네임을 입력해 주세요';

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

  @media (max-width: 768px) {
    a > button {
      width: calc(100% - 2rem);
    }
  }
  @media (max-width: 480px) {
    a > button {
      width: 90%;
    }
  }
`;

const InputContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
  position: relative;

  > * {
    margin: 0 0 0.8rem 0 !important;
  }

  a {
    margin-top: 3rem !important;
    display: block;
  }

  > button {
    position: absolute;
    right: 1rem;
    top: 10px;
  }
`;

const Join: NextPage = () => {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [color, setColor] = useState('fff');

  const idCheck = async () => {
    return await fetch(`http://localhost:5000/checkId?id=${id}`)
      .then((res) => res.json())
      .then((res) => res);
  };

  const signUp = async () => {
    const { result, message } = await idCheck();

    if (result) alert(message);
    else {
      fetch(`http://localhost:5000/signUp`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          id,
          password,
          nickname,
          color,
        }),
      })
        .then((res) => res.json())
        .then(({ isLogin, message, token }) => {
          if (isLogin) {
            setToken(token);
            Router.push('/lobby');
          } else alert(message);
        });
    }
  };

  const handleIdCheck = async () => {
    if (!id) alert(ID_EMPTY_MSG);
    else {
      const { result, message } = await idCheck();
      alert(message);
    }
  };

  const handleJoin = async () => {
    if (!id) alert(ID_EMPTY_MSG);
    else if (!password) alert(PASSWORD_EMPTY_MSG);
    else if (!nickname) alert(NICKNAME_EMPTY_MSG);
    else signUp();
  };
  return (
    <>
      <MenuInfoBox name="회원가입" />
      <PageBox>
        <LoginContainer>
          <ProfileSelector color={color} setColor={setColor}></ProfileSelector>
          <InputContainer>
            <InputBox
              isSearch={false}
              placeholder="아이디를 입력하세요."
              width={'100%'}
              height={'80px'}
              fontSize={'20px'}
              value={id}
              onChangeHandler={({ target }) => setID((target as HTMLInputElement).value)}
            ></InputBox>
            <Button
              content={'중복확인'}
              background={theme.colors.peach}
              fontSize={'18px'}
              paddingH={'18px'}
              width={'120px'}
              onClick={handleIdCheck}
            ></Button>
            <InputBox
              isSearch={false}
              placeholder="비밀번호를 입력해 주세요."
              width={'100%'}
              height={'80px'}
              fontSize={'20px'}
              value={password}
              onChangeHandler={({ target }) => setPassword((target as HTMLInputElement).value)}
            ></InputBox>
            <InputBox
              isSearch={false}
              placeholder="닉네임을 입력하세요."
              width={'100%'}
              height={'80px'}
              fontSize={'20px'}
              value={nickname}
              onChangeHandler={({ target }) => setNickname((target as HTMLInputElement).value)}
            ></InputBox>
            <Link href="/join">
              <a>
                <Button
                  width={'480px'}
                  background={theme.colors.sky}
                  fontSize={'30px'}
                  paddingH={'24px'}
                  content={'가입하기'}
                  onClick={handleJoin}
                />
              </a>
            </Link>
          </InputContainer>
        </LoginContainer>
      </PageBox>
    </>
  );
};

export default Join;
