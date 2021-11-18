import { Request, Response } from 'express';

import * as UserService from '../user/service';

import * as PlaylistService from './service';

export const get = async (req: Request, res: Response) => {
  const LIMIT = 10;

  try {
    const { page, q } = req.query as { page?: string; q?: string };
    const currentPage = isNaN(Number(page)) ? 1 : Number(page);
    const offset = isNaN(Number(page)) ? 0 : LIMIT * (currentPage - 1);
    const total = await PlaylistService.getLength();
    const maxPage = Math.ceil(total / LIMIT);
    const playlists = await PlaylistService.search(q || '', offset, LIMIT);

    res.json({ status: 'SUCCESS', playlists, currentPage, maxPage });
  } catch (error) {
    res.json({ status: 'FAILED', error });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const playlist = await PlaylistService.getById(_id);
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
    const result = await PlaylistService.updateById(_id, data);
    res.json({ status: 'SUCCESS', result });
  } catch (error) {
    res.json({ status: 'FAILED', error });
  }
};

export const del = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const result = await PlaylistService.deleteById(_id);
    res.json({ status: 'SUCCESS', result });
  } catch (error) {
    res.json({ status: 'FAILED', error });
  }
};
