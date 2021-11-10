import { Request, Response } from 'express';

import * as UserService from './service';

export const checkId = async (req: Request, res: Response) => {
  try {
    const id: string = req.query.id as string;
    const result = await UserService.idCheck(id);
    if (result) throw Error('이미 존재하는 아이디입니다.');
    res.json({ result, message: '사용 가능한 아이디입니다.' });
  } catch (err: any) {
    res.json({ result: false, message: err.message });
  }
};

export const checkLogin = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.json({ decoded: null });
      return;
    }
    const decoded = UserService.verifyToken(token) as UserService.UserToken;
    if (decoded.id) {
      const userInfo = await UserService.getUserInfo(decoded.id);
      res.json(userInfo[0]);
      return;
    }
    res.json(decoded);
  } catch (err: any) {
    res.json({ message: err.message });
  }
};

export const resetPwd = async (req: Request, res: Response) => {
  try {
    const { id, nickname, password }: { id: string; nickname: string; password: string } = req.body;
    const result = await UserService.checkChangePasswordAvailable(id, nickname, password);
    res.json(result);
  } catch (err: any) {
    res.json({ isChange: false, message: err.message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { id, password }: UserService.LoginInfo = req.body;
    const result = await UserService.login({ id, password });
    res.cookie('token', UserService.createUserToken(id), { maxAge: 24 * 60 * 60 * 1000 });
    res.json(result);
  } catch (err: any) {
    res.json({ isLogin: false, message: err.message });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { id, password, nickname, color }: UserService.UserType = req.body;
    const result = await UserService.join({ id, password, nickname, color });
    res.cookie('token', UserService.createUserToken(id), { maxAge: 24 * 60 * 60 * 1000 });
    res.json(result);
  } catch (err: any) {
    res.json({ isLogin: false, message: err.message });
  }
};

export const guestSignIn = (req: Request, res: Response) => {
  try {
    const { nickname, color }: UserService.GuestLoginInfo = req.body;
    const result = UserService.enter();
    res.cookie('token', UserService.createNonUserToken(nickname, color), { maxAge: 24 * 60 * 60 * 1000 });
    res.json(result);
  } catch (err: any) {
    res.json({ isLogin: false, message: err.message });
  }
};

export const logOut = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.sendStatus(200);
};
