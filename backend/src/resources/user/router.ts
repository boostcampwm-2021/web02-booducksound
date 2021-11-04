import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import userService from './service';

export interface loginInfo {
  id: string;
  password: string;
}

export interface userType extends loginInfo {
  nickname: string;
  color?: string;
}

const router = express.Router();
require('dotenv').config();

router.post('/login', (req: Request, res: Response) => {
  const { id, password }: loginInfo = req.body;
  // userService.login(id, password);
  res.json({ a: 1 });
});

router.post('/join', (req: Request, res: Response) => {
  const { id, password, nickname, color }: userType = req.body;
  const result = userService.join({ id, password, nickname, color });
  res.json(result);
});

export default router;
