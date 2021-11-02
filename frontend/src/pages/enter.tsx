import styled from '@emotion/styled';
import { NextPage } from 'next';
import Link from 'next/link';

import Button from '../components/atoms/Button';
import InputBox from '../components/atoms/InputBox';
import MenuInfoBox from '../components/atoms/MenuInfoBox';
import PageBox from '../components/atoms/PageBox';
import ProfileSelector from '../components/atoms/ProfileSelector';
import theme from '../styles/theme';

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

const InputContainer = styled.div`
  width: fit-content;
  margin: 0 auto;

  a {
    margin-top: 3rem;
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

const Enter: NextPage = () => {
  return (
    <>
      <MenuInfoBox name="비회원 로그인" />
      <PageBox>
        <EnterContainer>
          <ProfileSelector></ProfileSelector>
          <InputContainer>
            <InputBox isSearch={false} placeholder="닉네임을 입력하세요." height={'80px'} fontSize={'20px'}></InputBox>
            <Link href="/">
              <a>
                <Button
                  width={'480px'}
                  background={theme.colors.sky}
                  fontSize={'30px'}
                  paddingH={'24px'}
                  content={'참여하기'}
                />
              </a>
            </Link>
          </InputContainer>
        </EnterContainer>
      </PageBox>
    </>
  );
};

export default Enter;
