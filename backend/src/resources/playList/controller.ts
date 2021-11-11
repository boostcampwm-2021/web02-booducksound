import { Request, Response } from 'express';

import * as UserService from '../user/service';

import * as PlaylistService from './service';

export const get = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const playlist = await PlaylistService.get(_id);
    res.json({ status: 'SUCCESS', playlist });
  } catch (error) {
    res.json({ status: 'FAILED', error });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const playlist = await PlaylistService.add(req.body);
    await UserService.postMyPlaylist(req.body.userId, playlist._id);
    res.json({ status: 'SUCCESS', playlist });
  } catch (error) {
    res.json({ status: 'FAILED', error });
  }
};

export const update = async (req: Request, res: Response) => {
  const { _id, data } = req.body;
  try {
    const result = await PlaylistService.update(_id, data);
    res.json({ status: 'SUCCESS', result });
  } catch (error) {
    res.json({ status: 'FAILED', error });
  }
};

export const del = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const result = await PlaylistService.del(_id);
    res.json({ status: 'SUCCESS', result });
  } catch (error) {
    res.json({ status: 'FAILED', error });
  }
};
