import { toast } from 'react-toastify';

import { BACKEND_URI, TOAST_OPTION } from '~/constants/index';
import API from '~/utils/API';

export const getUserInfo = async () => {
  const res = await API('GET')(`${BACKEND_URI}/check-login`)();
  return res.json();
};

export const requestLogin = async (id: string, password: string) => {
  const res = await API('POST')(`${BACKEND_URI}/sign-in`)({ body: JSON.stringify({ id, password }) });
  const { isLogin, message } = await res.json();
  if (!isLogin) toast.error(message, TOAST_OPTION);
  return isLogin;
};

export const requestLogout = async () => {
  await API('GET')(`${BACKEND_URI}/log-out`)();
};

export const requestChangePassword = async (id: string, nickname: string, password: string) => {
  const res = await API('POST')(`${BACKEND_URI}/reset-pwd`)({ body: JSON.stringify({ id, nickname, password }) });
  const { isChange, message } = await res.json();
  isChange ? toast.success(message, TOAST_OPTION) : toast.error(message, TOAST_OPTION);
  if (isChange) history.back();
};

export const requestEnter = async (nickname: string, color: string) => {
  const res = await API('POST')(`${BACKEND_URI}/guest-sign-in`)({ body: JSON.stringify({ nickname, color }) });
  const { isLogin, message } = await res.json();

  if (!isLogin) return toast.error(message, TOAST_OPTION);
  toast.info(message, TOAST_OPTION);
};

export const requestJoin = async (id: string, password: string, nickname: string, color: string) => {
  const res = await API('POST')(`${BACKEND_URI}/sign-up`)({ body: JSON.stringify({ id, password, nickname, color }) });
  const { isLogin, message } = await res.json();

  if (!isLogin) return toast.error(message, TOAST_OPTION);
  toast.info(message, TOAST_OPTION);
};
