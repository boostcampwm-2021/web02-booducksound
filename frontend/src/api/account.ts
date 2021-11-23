import { BACKEND_URL } from '~/constants/index';
import API from '~/utils/API';

export const getUserInfo = async () => {
  const res = await API('GET')(`${BACKEND_URL}/check-login`)();
  return res.json();
};

export const requestLogin = async (id: string, password: string) => {
  const res = await API('POST')(`${BACKEND_URL}/sign-in`)({ body: JSON.stringify({ id, password }) });
  const { isLogin, message } = await res.json();
  if (!isLogin) alert(message);
  return isLogin;
};

export const requestLogout = async () => {
  await API('GET')(`${BACKEND_URL}/log-out`)();
};

export const requestChangePassword = async (id: string, nickname: string, password: string) => {
  const res = await API('POST')(`${BACKEND_URL}/reset-pwd`)({ body: JSON.stringify({ id, nickname, password }) });
  const { isChange, message } = await res.json();
  alert(message);
  if (isChange) history.back();
};

export const requestEnter = async (nickname: string, color: string) => {
  const res = await API('POST')(`${BACKEND_URL}/guest-sign-in`)({ body: JSON.stringify({ nickname, color }) });
  const { isLogin, message } = await res.json();

  if (!isLogin) alert(message);
};

export const requestJoin = async (id: string, password: string, nickname: string, color: string) => {
  const res = await API('POST')(`${BACKEND_URL}/sign-up`)({ body: JSON.stringify({ id, password, nickname, color }) });
  const { isLogin, message } = await res.json();

  if (!isLogin) alert(message);
};
