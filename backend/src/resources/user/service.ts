import User from '../../models/User';

export interface loginInfo {
  id: string;
  password: string;
}

export interface userType extends loginInfo {
  nickname: string;
  color?: string;
}

// 아이디 중복확인
const idCheck = (id: string) => {
  //
};

// 로그인(아이디, 비밀번호 일치하는 사용자 여부)
const login = ({ id, password }: loginInfo) => {
  //
};
// 회원가입
const join = ({ id, password, nickname, color }: userType) => {
  const newUser = new User({
    id,
    password,
    nickname,
    color,
  });
  newUser.save().then((res: any) => res);
};
// 비밀번호 변경(아이디, 닉네임을 받아오자.)
const changePassword = (id: string, newPw: string) => {
  //
};

const getUserInfo = (id: string) => {
  User.findOne({ id }).exec((err, user) => {
    if (err) return err;
    return user;
  });
};

// 로그아웃
const logout = (id: string) => {
  //
};

export default {
  idCheck,
  login,
  join,
  changePassword,
  getUserInfo,
  logout,
};
