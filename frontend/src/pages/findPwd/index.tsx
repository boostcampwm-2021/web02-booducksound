import { useState, useEffect, ChangeEvent } from 'react';

import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { requestChangePassword } from '~/api/account';
import InputText from '~/atoms/InputText';
import MenuInfoBox from '~/atoms/MenuInfoBox';
import PageBox from '~/atoms/PageBox';
import {
  ID_EMPTY_MSG,
  PASSWORD_EMPTY_MSG,
  NICKNAME_EMPTY_MSG,
  TOAST_OPTION,
  PASSWORD_RENEW_MSG,
} from '~/constants/index';
import ResponsiveButton from '~/molecules/ResponsiveButton';
import { RootState } from '~/reducers/index';
import theme from '~/styles/theme';

const LoginContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    > * {
      width: 100%;
    }

    button {
      width: 100%;
      padding: 20px 0;
      margin-top: 0.8rem;
    }
  }
`;

const FindPwdInputText = styled(InputText)`
  width: 100%;
  font-size: 20px;
  padding: 24px 20px 24px 80px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 18px;
    padding: 24px 40px 24px 40px;
  }
`;

const FindPwd: NextPage = () => {
  const [id, setID] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const userInfo = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const { id, nickname } = userInfo;
    setID(id);
    setNickname(nickname);
  }, [userInfo]);

  const handleFindPwd = () => {
    if (!id) return toast.error(ID_EMPTY_MSG, TOAST_OPTION);
    if (!nickname) return toast.error(NICKNAME_EMPTY_MSG, TOAST_OPTION);
    if (!password) return toast.error(PASSWORD_EMPTY_MSG, TOAST_OPTION);
    requestChangePassword(id, nickname, password);
  };

  return (
    <>
      <MenuInfoBox content="비밀번호 재설정" />
      <PageBox>
        <LoginContainer>
          <InputContainer>
            <FindPwdInputText
              className="id"
              isSearch={false}
              placeholder={ID_EMPTY_MSG}
              value={id}
              handleChange={({ target }: ChangeEvent) => setID((target as HTMLInputElement).value)}
            ></FindPwdInputText>
            <FindPwdInputText
              className="nick"
              isSearch={false}
              placeholder={NICKNAME_EMPTY_MSG}
              value={nickname}
              handleChange={({ target }: ChangeEvent) => setNickname((target as HTMLInputElement).value)}
            ></FindPwdInputText>
            <FindPwdInputText
              className="password"
              type="password"
              isSearch={false}
              placeholder={PASSWORD_RENEW_MSG}
              value={password}
              handleChange={({ target }: ChangeEvent) => setPassword((target as HTMLInputElement).value)}
            ></FindPwdInputText>
            <ResponsiveButton
              width="560px"
              background={theme.colors.sky}
              fontSize="28px"
              smFontSize="20px"
              onClick={handleFindPwd}
            >
              비밀번호 재설정
            </ResponsiveButton>
          </InputContainer>
        </LoginContainer>
      </PageBox>
    </>
  );
};

export default FindPwd;
