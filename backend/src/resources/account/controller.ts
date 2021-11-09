import { Request, Response } from 'express';

import UserService, { LoginInfo, GuestLoginInfo, UserType, UserToken } from './service';

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
  if (!token) res.json({ decoded: null });
  const decoded = UserService.verifyToken(token) as UserToken;
  if (decoded.id) {
    const userInfo = await UserService.getUserInfo(decoded.id);
    res.json(userInfo[0]);
    return;
  }
  res.json(decoded);
};

const resetPwd = async (req: Request, res: Response) => {
  const { id, nickname, password }: { id: string; nickname: string; password: string } = req.body;
  const result = await UserService.checkChangePasswordAvailable(id, nickname, password);
  res.json(result);
};

const signIn = async (req: Request, res: Response) => {
  const { id, password }: LoginInfo = req.body;
  const result = await UserService.login({ id, password });
  const date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // 1day
  res.cookie('token', UserService.createUserToken(id), {
    expires: date,
  });
  res.json(result);
};

const signUp = async (req: Request, res: Response) => {
  const { id, password, nickname, color }: UserType = req.body;
  const result = await UserService.join({ id, password, nickname, color });
  const date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // 1day
  res.cookie('token', UserService.createUserToken(id), {
    expires: date,
  });
  res.json(result);
};

const guestSignIn = (req: Request, res: Response) => {
  const { nickname, color }: GuestLoginInfo = req.body;
  const result = UserService.enter();
  const date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // 1day
  res.cookie('token', UserService.createNonUserToken(nickname, color), {
    expires: date,
  });
  res.json(result);
};

const logOut = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.sendStatus(200);
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
