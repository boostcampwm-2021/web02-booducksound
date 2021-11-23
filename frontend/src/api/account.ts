import Router from 'next/router';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';

import { BACKEND_URL } from '~/constants/index';
import API from '~/utils/API';

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
  const res = await API('GET')(`${BACKEND_URL}/check-login`)();
  return res.json();
};

export const updateStoreData = (getUser: Function) => {
  getUser() && handleLoginUser();
};

export const requestLogin = async (id: string, password: string) => {
  const res = await API('POST')(`${BACKEND_URL}/sign-in`)({ body: JSON.stringify({ id, password }) });
  const { isLogin, message } = await res.json();
  if (!isLogin) toast.error(message);
  return isLogin;
};

export const requestLogout = async () => {
  await API('GET')(`${BACKEND_URL}/log-out`)();
  handleLoginUser();
};

export const requestChangePassword = async (id: string, nickname: string, password: string) => {
  const res = await API('POST')(`${BACKEND_URL}/reset-pwd`)({ body: JSON.stringify({ id, nickname, password }) });
  const { isChange, message } = await res.json();
  isChange ? toast.success(message) : toast.error(message);
  if (isChange) history.back();
};

export const requestEnter = async (nickname: string, color: string) => {
  const res = await API('POST')(`${BACKEND_URL}/guest-sign-in`)({ body: JSON.stringify({ nickname, color }) });
  const { isLogin, message } = await res.json();

  if (!isLogin) return toast.error(message);
  toast.info(message);
};

export const requestJoin = async (id: string, password: string, nickname: string, color: string) => {
  const res = await API('POST')(`${BACKEND_URL}/sign-up`)({ body: JSON.stringify({ id, password, nickname, color }) });
  const { isLogin, message } = await res.json();

  if (!isLogin) return toast.error(message);
  toast.info(message);
};
