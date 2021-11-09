import { Request, Response } from 'express';

import UserService from './service';

const changeColor = async (req: Request, res: Response) => {
  const { id, color }: { id: string; color: string } = req.body;
  await UserService.changeColor(id, color);
  res.sendStatus(200);
};

const getMyPlaylist = async (req: Request, res: Response) => {
  const _id = req.query._id as string;
  const result = await UserService.getMyPlaylist(_id);
  res.json(result);
};

export default {
  changeColor,
  getMyPlaylist,
};
