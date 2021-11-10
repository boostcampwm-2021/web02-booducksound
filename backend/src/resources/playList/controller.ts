import { Request, Response } from 'express';

import * as UserService from '../user/service';

import * as PlaylistService from './service';

export const get = async (req: Request, res: Response) => {
  try {
    if (typeof req.query._id !== 'string') throw Error('Not Exist ObjectId');
    const playlist = await PlaylistService.get(req.query._id);
    res.json({ status: 'SUCCESS', playlist });
  } catch (e) {
    res.json({ status: 'FAILED', e });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const playlist = await PlaylistService.add(req.body);
    await UserService.postMyPlaylist(req.body.userId, playlist._id);
    res.json({ status: 'SUCCESS', playlist });
  } catch (e) {
    console.error('here', e);
    res.json({ status: 'FAILED', error: e });
  }
};

export const update = async (req: Request, res: Response) => {
  const { _id, data } = req.body;
  try {
    const result = await PlaylistService.update(_id, data);
    res.json({ status: 'SUCCESS', result });
  } catch (e) {
    res.json({ status: 'FAILED', error: e });
  }
};

export const del = async (req: Request, res: Response) => {
  try {
    const result = await PlaylistService.del(req.body);
    res.json({ status: 'SUCCESS', result });
  } catch (e) {
    res.json({ status: 'FAILED', error: e });
  }
};
