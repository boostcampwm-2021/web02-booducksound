import Router from 'next/router';
import { Cookies } from 'react-cookie';

import { HEADERS as headers, BACKEND_URL } from '~/constants/index';

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
  const res = await fetch(`${BACKEND_URL}/checkLogin`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
  return res.json();
};

export const requestLogin = async (id: string, password: string) => {
  const res = await fetch(`${BACKEND_URL}/signIn`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      id,
      password,
    }),
  }).then((res) => res.json());
  const { isLogin, message } = res;
  if (isLogin) {
    Router.push('/lobby');
  } else alert(message);
};

export const requestLogout = () => {
  fetch(`${BACKEND_URL}/logOut`, {
    method: 'GET',
    headers,
    credentials: 'include',
  }).then(handleLoginUser);
};

export const requestChangePassword = async (id: string, nickname: string, password: string) => {
  const res = await fetch(`${BACKEND_URL}/resetPwd`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      id,
      nickname,
      password,
    }),
  }).then((res) => res.json());
  const { isChange, message } = res;
  alert(message);
  if (isChange) history.back();
};

export const requestEnter = async (nickname: string, color: string) => {
  const res = await fetch(`${BACKEND_URL}/guestSignIn`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      nickname,
      color,
    }),
  }).then((res) => res.json());
  const { isLogin, message } = res;
  if (isLogin) {
    Router.push('/lobby');
  } else alert(message);
};

export const requestJoin = async (id: string, password: string, nickname: string, color: string) => {
  const res = await fetch(`${BACKEND_URL}/signUp`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      id,
      password,
      nickname,
      color,
    }),
  }).then((res) => res.json());
  const { isLogin, message } = res;
  if (isLogin) {
    Router.push('/lobby');
  } else alert(message);
};
