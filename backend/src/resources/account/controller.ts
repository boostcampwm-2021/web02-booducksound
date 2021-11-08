import { Request, Response } from 'express';

import UserService, { LoginInfo, GuestLoginInfo, UserType, LoginResponse, UserToken } from './service';

const checkId = async (req: Request, res: Response) => {
  const id: string = req.query.id as string;
  const result = await UserService.idCheck(id);
  res.json({
    result,
    message: result ? '이미 존재하는 아이디입니다.' : '사용 가능한 아이디입니다.',
  });
};

const checkLogin = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (token) {
    const decoded = UserService.verifyToken(token) as UserToken;
    if (decoded.id) {
      const userInfo = await UserService.getUserInfo(decoded.id);
      res.json(userInfo[0]);
    }
    res.json(decoded);
  }
  res.json({ decoded: null });
};

const resetPwd = async (req: Request, res: Response) => {
  const { id, password }: LoginInfo = req.body;
  await UserService.changePassword(id, password);
  res.json({ result: true });
};

const signIn = async (req: Request, res: Response) => {
  const { id, password }: LoginInfo = req.body;
  await UserService.login({ id, password }, (e: LoginResponse) => res.json(e));
};

const signUp = async (req: Request, res: Response) => {
  const { id, password, nickname, color }: UserType = req.body;
  const result = await UserService.join({ id, password, nickname, color: `#${color}` });
  res.json(result);
};

const guestSignIn = (req: Request, res: Response) => {
  const { nickname, color }: GuestLoginInfo = req.body;
  UserService.enter({ nickname, color }, (e: LoginResponse) => res.json(e));
};

const logOut = (req: Request, res: Response) => {
  res.clearCookie('token');
};

export default {
  checkId,
  checkLogin,
  resetPwd,
  signIn,
  signUp,
  guestSignIn,
  logOut,
};
