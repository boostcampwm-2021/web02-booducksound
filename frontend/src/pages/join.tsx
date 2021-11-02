import styled from '@emotion/styled';
import { NextPage } from 'next';
import Link from 'next/link';

import Button from '../components/atoms/Button';
import InputBox from '../components/atoms/InputBox';
import MenuInfoBox from '../components/atoms/MenuInfoBox';
import PageBox from '../components/atoms/PageBox';
import ProfileSelector from '../components/atoms/ProfileSelector';
import theme from '../styles/theme';

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
    button {
      width: calc(100% - 2rem);
    }
  }
  @media (max-width: 480px) {
    button {
      width: 90%;
    }
  }
`;

const SearchPwdBtn = styled.a`
  color: ${theme.colors.deepgray};
  text-align: center;
  margin-top: 1.5rem;
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

  @media (max-width: 768px) {
    > * {
      width: 100% !important;
    }
    button {
      width: 90%;
    }
  }
`;

const Join: NextPage = () => {
  return (
    <>
      <MenuInfoBox name="회원가입" />
      <PageBox>
        <LoginContainer>
          <ProfileSelector></ProfileSelector>
          <InputContainer>
            <InputBox
              isSearch={false}
              placeholder="아이디를 입력하세요.  (한/영/숫자 4~10자)"
              width={480}
              height={20}
            ></InputBox>
          </InputContainer>
          <InputContainer>
            <InputBox
              isSearch={false}
              placeholder="비밀번호를 입력해 주세요. (한/영/숫자/특수문자 포함 8자 이상)"
              width={480}
              height={20}
            ></InputBox>
            <InputBox isSearch={false} placeholder="닉네임을 입력하세요." width={480} height={20}></InputBox>
            <Link href="/join">
              <a>
                <Button width={480} background={theme.colors.sky} fontSize={30} content={'가입하기'} />
              </a>
            </Link>
          </InputContainer>
        </LoginContainer>
      </PageBox>
    </>
  );
};

export default Join;
