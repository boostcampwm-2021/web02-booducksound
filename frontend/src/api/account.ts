import Router from 'next/router';
import { Cookies } from 'react-cookie';

export const ID_EMPTY_MSG = '아이디를 입력해 주세요';
export const PASSWORD_EMPTY_MSG = '비밀번호를 입력해 주세요';
export const NICKNAME_EMPTY_MSG = '닉네임을 입력해 주세요';
export const headers = { 'Content-Type': 'application/json' };
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const cookie = new Cookies();

export const getCookie = () => cookie.get('token');

export const handleLoginUser = () => {
  const token = getCookie();
  const notLoginUrlList = ['/', '/login', '/enter', '/join'];
  const loginUrlList = ['/mypage', '/lobby', '/playlist', '/game'];
  if (token && notLoginUrlList.some((e) => location.pathname === e)) Router.push('/lobby');
  if (!token && loginUrlList.some((e) => location.pathname.includes(e))) Router.push('/');
};

export const getUserInfo = async () => {
  return await fetch(`${BACKEND_URL}/checkLogin`, {
    method: 'GET',
    credentials: 'include',
  }).then((res) => res.json());
};

export const requestLogin = async (id: string, password: string) => {
  return await fetch(`${BACKEND_URL}/signIn`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      id,
      password,
    }),
  })
    .then((res) => res.json())
    .then(({ isLogin, message }) => {
      if (isLogin) {
        Router.push('/lobby');
      } else alert(message);
    });
};

export const requestLogout = () => {
  fetch(`${BACKEND_URL}/logOut`, {
    method: 'GET',
    credentials: 'include',
  }).then(handleLoginUser);
};

export const requestChangePassword = async (id: string, nickname: string, password: string) => {
  return await fetch(`${BACKEND_URL}/resetPwd`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      id,
      nickname,
      password,
    }),
  })
    .then((res) => res.json())
    .then(({ isChange, message }) => {
      alert(message);
      if (isChange) history.back();
    });
};

export const requestEnter = async (nickname: string, color: string) => {
  return await fetch(`${BACKEND_URL}/guestSignIn`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      nickname,
      color,
    }),
  })
    .then((res) => res.json())
    .then(({ isLogin, message }) => {
      if (isLogin) {
        Router.push('/lobby');
      } else alert(message);
    });
};

export const requestJoin = async (id: string, password: string, nickname: string, color: string) => {
  return await fetch(`${BACKEND_URL}/signUp`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      id,
      password,
      nickname,
      color,
    }),
  })
    .then((res) => res.json())
    .then(({ isLogin, message }) => {
      if (isLogin) {
        Router.push('/lobby');
      } else alert(message);
    });
};
