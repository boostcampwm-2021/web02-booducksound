import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import userService, { LoginInfo, UserType, LoginResponse } from './service';

const router = express.Router();
require('dotenv').config();

router.get('/idCheck', async (req: Request, res: Response) => {
  const id: string = req.query.id as string;
  const result = await userService.idCheck(id);
  res.json({ result });
});

router.post('/changePassword', async (req: Request, res: Response) => {
  const { id, password }: LoginInfo = req.body;
  await userService.changePassword(id, password);
  res.json({ result: true });
});

router.post('/login', async (req: Request, res: Response) => {
  const { id, password }: LoginInfo = req.body;
  await userService.login({ id, password }, (e: LoginResponse) => res.json(e));
});

router.post('/join', (req: Request, res: Response) => {
  const { id, password, nickname, color }: UserType = req.body;
  const result = userService.join({ id, password, nickname, color });
  res.json(result);
});

export default router;
