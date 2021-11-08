import { useState } from 'react';

import styled from '@emotion/styled';
import { NextPage } from 'next';

import { requestChangePassword, ID_EMPTY_MSG, PASSWORD_EMPTY_MSG, NICKNAME_EMPTY_MSG } from '~/api/account';
import InputBox from '~/atoms/InputBox';
import MenuInfoBox from '~/atoms/MenuInfoBox';
import PageBox from '~/atoms/PageBox';
import ResponsiveButton from '~/molecules/ResponsiveButton';
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

const InputContainer = styled.div`
  width: fit-content;
  margin: 0 auto;

  > * {
    margin: 0 auto 0.8rem auto !important;
  }

  a {
    margin-top: 2rem !important;
    display: block;
  }

  @media (max-width: 768px) {
    > * {
      width: 100% !important;
    }
    button {
      width: 90%;
    }
  }
`;

const FindPwd: NextPage = () => {
  const [id, setID] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleFindPwd = async () => {
    if (!id) alert(ID_EMPTY_MSG);
    else if (!nickname) alert(NICKNAME_EMPTY_MSG);
    else if (!password) alert(PASSWORD_EMPTY_MSG);
    else await requestChangePassword(id, nickname, password);
  };

  return (
    <>
      <MenuInfoBox name="비밀번호 재설정" />
      <PageBox>
        <LoginContainer>
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
            <InputBox
              isSearch={false}
              placeholder="닉네임을 입력하세요."
              width={'100%'}
              height={'80px'}
              fontSize={'20px'}
              value={nickname}
              onChangeHandler={({ target }) => setNickname((target as HTMLInputElement).value)}
            ></InputBox>
            <InputBox
              isPassword={true}
              isSearch={false}
              placeholder="새로운 비밀번호를 입력하세요."
              width={'100%'}
              height={'80px'}
              fontSize={'20px'}
              value={password}
              onChangeHandler={({ target }) => setPassword((target as HTMLInputElement).value)}
            ></InputBox>
            <ResponsiveButton
              width={'560px'}
              background={theme.colors.sky}
              fontSize={'28px'}
              smFontSize={'20px'}
              content={'비밀번호 재설정'}
              onClick={handleFindPwd}
            />
          </InputContainer>
        </LoginContainer>
      </PageBox>
    </>
  );
};

export default FindPwd;
