import { Request, Response } from 'express';

import * as AccountService from '~/resources/account/service';
import * as UserService from '~/resources/user/service';

export const changeColor = async (req: Request, res: Response) => {
  try {
    const { id, color }: { id: string; color: string } = req.body;
    await UserService.changeColor(id, color);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};

export const changeNonUserColor = (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    const { color } = req.body;

    if (!token) throw Error('유효하지 않은 Token입니다.');

    const { nickname } = AccountService.verifyToken(token) as AccountService.GuestLoginInfo;
    res.cookie('token', AccountService.createNonUserToken(nickname, color), { maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(401);
  }
};

export const getMyPlaylist = async (req: Request, res: Response) => {
  try {
    const _id = req.query._id as string;
    const result = await UserService.getMyPlaylist(_id);
    res.json(result);
  } catch (err) {
    res.sendStatus(400);
  }
};

export const putLikes = async (req: Request, res: Response) => {
  try {
    const { playlistId, _id } = req.body;
    await UserService.insertLikes(_id, playlistId);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};

export const deleteLikes = async (req: Request, res: Response) => {
  try {
    const { playlistId, _id } = req.query;
    if (!playlistId || !_id) throw Error('Not Exist UserId or PlaylistId');
    await UserService.deleteLikes(playlistId as string, _id as string);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};
