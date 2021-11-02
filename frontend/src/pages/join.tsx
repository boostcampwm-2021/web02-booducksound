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
  return (
    <>
      <MenuInfoBox name="회원가입" />
      <PageBox>
        <LoginContainer>
          <ProfileSelector></ProfileSelector>
          <InputContainer>
            <InputBox isSearch={false} placeholder="아이디를 입력하세요." height={'80px'} fontSize={'20px'}></InputBox>
            <Button
              className="dsadsa"
              content={'중복확인'}
              background={theme.colors.peach}
              fontSize={'18px'}
              paddingH={'18px'}
              width={'120px'}
            ></Button>
            <InputBox
              isSearch={false}
              placeholder="비밀번호를 입력해 주세요."
              height={'80px'}
              fontSize={'20px'}
            ></InputBox>
            <InputBox isSearch={false} placeholder="닉네임을 입력하세요." height={'80px'} fontSize={'20px'}></InputBox>
            <Link href="/join">
              <a>
                <Button
                  width={'480px'}
                  background={theme.colors.sky}
                  fontSize={'30px'}
                  paddingH={'24px'}
                  content={'가입하기'}
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
