import { Request, Response } from 'express';

import PlaylistService from './service';

const Playlist = {
  // filter: async (req: Request, res: Response) => {
  //   await PlaylistService
  //     .get(req.body)
  //     .then((result: any) => res.json(result))
  //     .catch((e: Error) => res.json(e));
  // },
  register: async (req: Request, res: Response) => {
    try {
      const result = await PlaylistService.add(req.body);
      res.json({ status: 'SUCCESS', result });
    } catch (e) {
      res.json({ status: 'FAILED', error: e });
    }
  },
  modify: async (req: Request, res: Response) => {
    const { _id, data } = req.body;
    try {
      const result = await PlaylistService.modify(_id, data);
      res.json({ status: 'SUCCESS', result });
    } catch (e) {
      res.json({ status: 'FAILED', error: e });
    }
  },
  del: async (req: Request, res: Response) => {
    try {
      const result = await PlaylistService.del(req.body);
      res.json({ status: 'SUCCESS', result });
    } catch (e) {
      res.json({ status: 'FAILED', error: e });
    }
  },
};

export default Playlist;
