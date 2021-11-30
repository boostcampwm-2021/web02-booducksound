import { ChangeEvent, useState } from 'react';

import styled from '@emotion/styled';
import { NextPage } from 'next';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getUser } from '~/actions/user';
import { requestEnter } from '~/api/account';
import Button from '~/atoms/Button';
import InputText from '~/atoms/InputText';
import MenuInfoBox from '~/atoms/MenuInfoBox';
import PageBox from '~/atoms/PageBox';
import { INIT_USER_COLOR_HEX, NICKNAME_EMPTY_MSG, TOAST_OPTION } from '~/constants/index';
import ProfileSelector from '~/molecules/ProfileSelector';
import theme from '~/styles/theme';

const EnterContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    button {
      width: calc(100% - 2rem);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
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

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    > * {
      width: 100%;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 18px;
    padding: 24px 40px 24px 40px;
  }
`;

const Enter: NextPage = () => {
  const [nickname, setNickname] = useState('');
  const [color, setColor] = useState(INIT_USER_COLOR_HEX);
  const dispatch = useDispatch();

  const handleEnter = async () => {
    if (!nickname) return toast.error(NICKNAME_EMPTY_MSG, TOAST_OPTION);
    await requestEnter(nickname, color);
    dispatch(getUser());
    Router.push('/lobby');
  };

  return (
    <>
      <MenuInfoBox content="비회원 로그인" />
      <PageBox>
        <EnterContainer>
          <ProfileSelector color={color} setColor={setColor}></ProfileSelector>
          <InputContainer>
            <EnterInputText
              className="nickname"
              isSearch={false}
              placeholder={NICKNAME_EMPTY_MSG}
              value={nickname}
              handleChange={({ target }: ChangeEvent) => setNickname((target as HTMLInputElement).value.trim())}
            ></EnterInputText>
            <a>
              <Button width="480px" background={theme.colors.sky} fontSize="30px" paddingH="24px" onClick={handleEnter}>
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
