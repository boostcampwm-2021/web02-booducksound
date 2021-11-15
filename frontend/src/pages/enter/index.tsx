import { useState } from 'react';

import styled from '@emotion/styled';
import { NextPage } from 'next';
import Router from 'next/router';
import { useDispatch } from 'react-redux';

import { getUser } from '~/actions/user';
import { requestEnter } from '~/api/account';
import Button from '~/atoms/Button';
import InputText from '~/atoms/InputText';
import MenuInfoBox from '~/atoms/MenuInfoBox';
import PageBox from '~/atoms/PageBox';
import ProfileSelector from '~/atoms/ProfileSelector';
import { NICKNAME_EMPTY_MSG } from '~/constants/index';
import theme from '~/styles/theme';

const EnterContainer = styled.div`
  position: fixed;
  width: calc(100vw - 8rem);
  height: max-content;
  margin: auto;
  text-align: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  @media (max-width: ${theme.breakpoints.md}) {
    button {
      width: calc(100% - 2rem);
    }
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    button {
      width: 90%;
    }
  }
`;

const InputContainer = styled.div`
  width: fit-content;
  margin: 0 auto;

  a {
    margin-top: 3rem;
    display: block;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    > * {
      width: 100% !important;
    }
    button {
      width: 90%;
      font-size: 18px;
    }
  }
`;

const EnterInputText = styled(InputText)`
  width: 100%;
  font-size: 20px;
  padding: 20px 20px 20px 80px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 18px;
    padding: 24px 40px 24px 40px;
  }
`;

const Enter: NextPage = () => {
  const [nickname, setNickname] = useState('');
  const [color, setColor] = useState('fff');
  const dispatch = useDispatch();

  const handleEnter = async () => {
    if (!nickname) return alert(NICKNAME_EMPTY_MSG);
    await requestEnter(nickname, color);
    dispatch(getUser());
    Router.push('/lobby');
  };

  return (
    <>
      <MenuInfoBox name="비회원 로그인" />
      <PageBox>
        <EnterContainer>
          <ProfileSelector color={color} setColor={setColor}></ProfileSelector>
          <InputContainer>
            <EnterInputText
              className="nickname"
              isSearch={false}
              placeholder="닉네임을 입력하세요."
              value={nickname}
              handleChange={({ target }) => setNickname((target as HTMLInputElement).value.trim())}
            ></EnterInputText>
            <a>
              <Button
                width={'480px'}
                background={theme.colors.sky}
                fontSize={'30px'}
                paddingH={'24px'}
                onClick={handleEnter}
              >
                참여하기
              </Button>
            </a>
          </InputContainer>
        </EnterContainer>
      </PageBox>
    </>
  );
};

export default Enter;
