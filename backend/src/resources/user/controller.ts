import { Request, Response } from 'express';
import mongoose from 'mongoose';

import AccountService, { GuestLoginInfo } from '../account/service';

import UserService from './service';

const changeColor = async (req: Request, res: Response) => {
  const { id, color }: { id: string; color: string } = req.body;
  await UserService.changeColor(id, color);
  res.sendStatus(200);
};

const changeNonUserColor = (req: Request, res: Response) => {
  const token = req.cookies.token;
  const { color } = req.body;
  if (token) {
    const { nickname } = AccountService.verifyToken(token) as GuestLoginInfo;
    const date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // 1day
    res.cookie('token', AccountService.createNonUserToken(nickname, color), {
      expires: date,
    });
    res.sendStatus(200);
  }
};

const getMyPlaylist = async (req: Request, res: Response) => {
  const _id = req.query._id as string;
  const result = await UserService.getMyPlaylist(_id);
  res.json(result);
};

const deleteLikes = async (req: Request, res: Response) => {
  const { id, _id }: { id: string; _id: mongoose.Types.ObjectId } = req.body;
  await UserService.deleteLikes(id, _id);
  res.sendStatus(200);
};

export default {
  changeColor,
  changeNonUserColor,
  getMyPlaylist,
  deleteLikes,
};
