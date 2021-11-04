import jwt from 'jsonwebtoken';

import User from '../../models/User';
require('dotenv').config();
const SECRET_KEY: string = process.env.JWT_SECRET || '';

export interface LoginInfo {
  id: string;
  password: string;
}

export interface UserType extends LoginInfo {
  nickname: string;
  color?: string;
}

export interface LoginResponse {
  isLogin: boolean;
  message: string;
}

const idCheck = async (id: string) => {
  const result = await User.find({ id });
  return result.length > 0;
};

const createToken = (id: any) => {
  const token = jwt.sign(
    {
      id,
    },
    SECRET_KEY,
    {
      expiresIn: '1h',
    },
  );
  return token;
};

const login = async ({ id, password }: LoginInfo, cb: any) => {
  await User.findOne({ id }, (err: any, user: any) => {
    if (err || user === null) {
      const result = {
        isLogin: false,
        message: '존재하지 않는 아이디입니다.',
      };
      return cb(result);
    }
    const res = user.checkPassword(password);
    const result = {
      isLogin: res,
      message: res ? '로그인에 성공했습니다.' : '비밀번호가 틀렸습니다.',
    };
    cb(result);
  });
};

const join = ({ id, password, nickname, color }: UserType) => {
  const newUser = new User({
    id,
    password,
    nickname,
    color,
  });
  newUser.save().then((res: any) => res);
};

const changePassword = async (id: string, newPw: string) => {
  await User.updateOne({ id }, { password: newPw });
};

const getUserInfo = async (id: string) => {
  const result = await User.find({ id });
  return result;
};

export default {
  idCheck,
  createToken,
  login,
  join,
  changePassword,
  getUserInfo,
};
