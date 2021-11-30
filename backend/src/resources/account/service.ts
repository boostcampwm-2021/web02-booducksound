import jwt from 'jsonwebtoken';

import User from '~/models/User';
const SECRET_KEY: string = process.env.JWT_SECRET || '';

export type LoginInfo = {
  id: string;
  password: string;
};

export interface UserType extends LoginInfo {
  nickname: string;
  color?: string;
}

export type LoginResponse = {
  isLogin: boolean;
  message: string;
  token: string | undefined;
};

export type GuestLoginInfo = {
  nickname: string;
  color: string;
};

export type UserToken = {
  id?: string;
  nickname?: string;
  color?: string;
  iat?: number;
  exp?: number;
};

export const idCheck = async (id: string) => {
  const result = await User.find({ id });
  return result.length > 0;
};

export const createUserToken = (id: string) => {
  const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '24h' });
  return token;
};

export const createNonUserToken = (nickname: string, color: string) => {
  const token = jwt.sign({ nickname, color }, SECRET_KEY, { expiresIn: '24h' });
  return token;
};

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, SECRET_KEY);
  if (decoded) return decoded as UserToken;
};

export const login = async ({ id, password }: LoginInfo) => {
  const user = await User.findOne({ id });
  if (!user) throw Error('존재하지 않는 아이디입니다.');
  const res = user.checkPassword(password);
  if (!res) throw Error('비밀번호가 틀렸습니다.');
  return {
    isLogin: res,
    message: '로그인에 성공했습니다.',
  };
};

export const join = async ({ id, password, nickname, color }: UserType) => {
  const newUser = new User({ id, password, nickname, color });
  const res = await newUser.save();

  return {
    isLogin: !!res,
    message: res ? '회원가입에 성공했습니다.' : '회원가입에 실패했습니다.',
  };
};

export const enter = () => {
  const result = {
    isLogin: true,
    message: '비회원 로그인에 성공했습니다.',
  };
  return result;
};

export const checkChangePasswordAvailable = async (id: string, nickname: string, newPw: string) => {
  const user = await User.findOne({ id, nickname });

  if (!user) throw Error('ID와 닉네임을 확인해 주세요.');
  await User.updateOne({ id }, { password: newPw });

  return {
    isChange: true,
    message: '비밀번호가 성공적으로 변경되었습니다.',
  };
};

export const getUserInfo = async (id: string) => {
  const result = await User.find({ id });
  return result;
};
