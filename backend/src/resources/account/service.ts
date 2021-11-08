import jwt from 'jsonwebtoken';

import User from '../../models/User';
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
  token: string | undefined;
}

export interface GuestLoginInfo {
  nickname: string;
  color: string;
}

export interface UserToken {
  id?: string;
  nickname?: string;
  color?: string;
  iat?: number;
  exp?: number;
}

const idCheck = async (id: string) => {
  const result = await User.find({ id });
  return result.length > 0;
};

const createUserToken = (id: string) => {
  const token = jwt.sign(
    {
      id,
    },
    SECRET_KEY,
    {
      expiresIn: '24h',
    },
  );
  return token;
};

const createNonUserToken = (nickname: string, color: string) => {
  const token = jwt.sign(
    {
      nickname,
      color,
    },
    SECRET_KEY,
    {
      expiresIn: '24h',
    },
  );
  return token;
};

const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, SECRET_KEY);
  try {
    if (decoded) return decoded as UserToken;
  } catch (err) {
    return {};
  }
};

const login = async ({ id, password }: LoginInfo, cb: any) => {
  await User.findOne({ id }, (err: Error, user: any) => {
    if (err || user === null) {
      const result = {
        isLogin: false,
        message: '존재하지 않는 아이디입니다.',
        token: undefined,
      };
      return cb(result);
    }
    const res = user.checkPassword(password);
    const result = {
      isLogin: res,
      message: res ? '로그인에 성공했습니다.' : '비밀번호가 틀렸습니다.',
      token: res ? createUserToken(id) : undefined,
    };
    cb(result);
  });
};

const join = async ({ id, password, nickname, color }: UserType) => {
  const newUser = new User({
    id,
    password,
    nickname,
    color,
  });
  return await newUser.save().then((res: any) => {
    return {
      isLogin: true,
      message: res ? '회원가입에 성공했습니다.' : '회원가입에 실패했습니다.',
      token: res ? createUserToken(id) : undefined,
    };
  });
};

const enter = ({ nickname, color }: GuestLoginInfo, cb: any) => {
  const result = {
    isLogin: true,
    message: '비회원 로그인에 성공했습니다.',
    token: createNonUserToken(nickname, color),
  };
  cb(result);
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
  createUserToken,
  createNonUserToken,
  verifyToken,
  login,
  join,
  enter,
  changePassword,
  getUserInfo,
};
