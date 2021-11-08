import { useEffect } from 'react';

import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Link from 'next/link';

import { handleLoginUser } from '../actions/account';
import Button from '../components/atoms/Button';
import theme from '../styles/theme';

const MainContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: max-content;
  margin: auto;
  text-align: center;
  top: 0;
  bottom: 0;

  &::before {
    content: '';
    background: url(images/ic_crong.png) no-repeat center bottom/contain;
    position: absolute;
    width: 36vw;
    height: 75vh;
    top: 0;
    left: 0;
    z-index: -1;
  }

  &::after {
    content: '';
    background: url(images/ic_booduck.png) no-repeat center bottom/contain;
    position: absolute;
    width: 36vw;
    height: 75vh;
    top: 0;
    right: 0;
    z-index: -1;
  }
  @media (max-width: 768px) {
    button {
      width: calc(100% - 2rem);
      margin-bottom: 1rem;
    }
  }
  @media (max-width: 480px) {
    button {
      width: 90%;
    }
  }
`;

const BtnBox = styled.div`
  @media (min-width: 768px) {
    margin-bottom: 1rem;

    > *:first-child {
      margin-right: 1rem;
    }
  }
`;

const Logo = styled.div`
  width: 90%;
  height: 360px;
  margin: 0 auto 1rem auto;
  background: url('images/ic_logo.png') no-repeat center/contain;
  animation: updown 0.75s linear 0s infinite alternate;

  @keyframes updown {
    from {
      margin-top: -10px;
    }
    to {
      margin-top: 10px;
    }
  }
`;

const Home: NextPage = () => {
  useEffect(() => {
    handleLoginUser();
  }, []);

  return (
    <MainContainer>
      <Logo />
      <BtnBox>
        <Link href="/login">
          <a>
            <Button
              width={'320px'}
              background={theme.colors.sand}
              paddingH={'24px'}
              fontSize={'28px'}
              content={'로그인'}
            />
          </a>
        </Link>
        <Link href="/join">
          <a>
            <Button
              width={'320px'}
              background={theme.colors.sand}
              paddingH={'24px'}
              fontSize={'28px'}
              content={'회원가입'}
            />
          </a>
        </Link>
      </BtnBox>
      <Link href="/enter">
        <a>
          <Button
            width={'656px'}
            background={theme.colors.mint}
            fontSize={'28px'}
            paddingH={'24px'}
            content={'비회원 로그인'}
          />
        </a>
      </Link>
    </MainContainer>
  );
};

export default Home;
