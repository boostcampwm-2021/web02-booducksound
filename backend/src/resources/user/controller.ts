import { Request, Response } from 'express';

import UserService from './service';

const changeColor = async (req: Request, res: Response) => {
  const { id, color }: { id: string; color: string } = req.body;
  await UserService.changeColor(id, color);
  res.sendStatus(200);
};

export default {
  changeColor,
};
