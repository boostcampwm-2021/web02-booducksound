import { useState } from 'react';

import styled from '@emotion/styled';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getUser } from '~/actions/user';
import { requestJoin } from '~/api/account';
import Button from '~/atoms/Button';
import InputText from '~/atoms/InputText';
import MenuInfoBox from '~/atoms/MenuInfoBox';
import PageBox from '~/atoms/PageBox';
import {
  ID_EMPTY_MSG,
  PASSWORD_EMPTY_MSG,
  NICKNAME_EMPTY_MSG,
  BACKEND_URL,
  TOAST_OPTION,
  INIT_USER_COLOR_HEX,
} from '~/constants/index';
import ProfileSelector from '~/molecules/ProfileSelector';
import theme from '~/styles/theme';
import API from '~/utils/API';

const LoginContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    a > button {
      width: calc(100% - 2rem);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    a > button {
      width: 90%;
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: 0 auto;
  position: relative;

  > * {
    margin: 0 0 0.8rem 0;
  }

  a {
    margin-top: 3rem;
    display: block;
  }

  > button {
    position: absolute;
    right: 1rem;
    top: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    button {
      font-size: 20px;
    }
  }
`;

const JoinInputText = styled(InputText)`
  width: 100%;
  font-size: 20px;
  padding: 24px 20px 24px 80px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 18px;
    padding: 24px 40px 24px 40px;
  }
`;

const Join: NextPage = () => {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [color, setColor] = useState(INIT_USER_COLOR_HEX);
  const dispatch = useDispatch();

  const idCheck = async () => {
    const res = await API('GET')(`${BACKEND_URL}/check-id?id=${id}`)();
    return res.json();
  };

  const signUp = async () => {
    const { result, message } = await idCheck();

    if (result) return toast.error(message, TOAST_OPTION);
    await requestJoin(id, password, nickname, color);
    dispatch(getUser());
    Router.push('/lobby');
  };

  const handleIdCheck = async () => {
    if (!id) return toast.error(ID_EMPTY_MSG, TOAST_OPTION);

    const { message } = await idCheck();
    toast.info(message, TOAST_OPTION);
  };

  const handleJoin = async () => {
    if (!id) return toast.error(ID_EMPTY_MSG, TOAST_OPTION);
    if (!password) return toast.error(PASSWORD_EMPTY_MSG, TOAST_OPTION);
    if (!nickname) return toast.error(NICKNAME_EMPTY_MSG, TOAST_OPTION);
    signUp();
  };

  return (
    <>
      <MenuInfoBox content="회원가입" />
      <PageBox>
        <LoginContainer>
          <ProfileSelector color={color} setColor={setColor}></ProfileSelector>
          <InputContainer>
            <JoinInputText
              className="newId"
              isSearch={false}
              placeholder={ID_EMPTY_MSG}
              value={id}
              handleChange={({ target }) => setID((target as HTMLInputElement).value.trim())}
            ></JoinInputText>
            <Button
              background={theme.colors.peach}
              fontSize="18px"
              paddingH="18px"
              width="120px"
              onClick={handleIdCheck}
            >
              중복확인
            </Button>
            <JoinInputText
              className="newPassword"
              type="password"
              isSearch={false}
              placeholder={PASSWORD_EMPTY_MSG}
              value={password}
              handleChange={({ target }) => setPassword((target as HTMLInputElement).value.trim())}
            ></JoinInputText>
            <JoinInputText
              className="newNickname"
              isSearch={false}
              placeholder={NICKNAME_EMPTY_MSG}
              value={nickname}
              handleChange={({ target }) => setNickname((target as HTMLInputElement).value.trim())}
            ></JoinInputText>
            <Link href="/join">
              <a>
                <Button
                  width="480px"
                  background={theme.colors.sky}
                  fontSize="30px"
                  paddingH="24px"
                  onClick={handleJoin}
                >
                  가입하기
                </Button>
              </a>
            </Link>
          </InputContainer>
        </LoginContainer>
      </PageBox>
    </>
  );
};

export default Join;
