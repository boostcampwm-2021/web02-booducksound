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
    console.log(req);
    await playListService
      .add(req.body)
      .then((result: any) => res.json({ status: 'SUCCESS', result }))
      .catch((e: Error) => res.json({ status: 'FAILED', error: e }));
  },
  modify: async (req: Request, res: Response) => {
    const { _id, data } = req.body;
    await playListService
      .modify(_id, data)
      .then((result: any) => res.json({ status: 'SUCCESS', result }))
      .catch((e: Error) => res.json({ status: 'FAILED', error: e }));
  },
  del: async (req: Request, res: Response) => {
    await playListService
      .del(req.body)
      .then((result: any) => res.json({ status: 'SUCCESS', result }))
      .catch((e: Error) => res.json({ status: 'FAILED', error: e }));
  },
};

export default playList;
