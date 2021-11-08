import { Request, Response } from 'express';

import playListService from './service';

const playList = {
  // filter: async (req: Request, res: Response) => {
  //   await playListService
  //     .get(req.body)
  //     .then((result: any) => res.json(result))
  //     .catch((e: Error) => res.json(e));
  // },
  register: async (req: Request, res: Response) => {
    try {
      const result = await playListService.add(req.body);
      res.json({ status: 'SUCCESS', result });
    } catch (e) {
      res.json({ status: 'FAILED', error: e });
    }
  },
  modify: async (req: Request, res: Response) => {
    const { _id, data } = req.body;
    try {
      const result = await playListService.modify(_id, data);
      res.json({ status: 'SUCCESS', result });
    } catch (e) {
      res.json({ status: 'FAILED', error: e });
    }
  },
  del: async (req: Request, res: Response) => {
    try {
      const result = await playListService.del(req.body);
      res.json({ status: 'SUCCESS', result });
    } catch (e) {
      res.json({ status: 'FAILED', error: e });
    }
  },
};

export default playList;
