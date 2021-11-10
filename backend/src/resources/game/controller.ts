import cloneable from 'cloneable-readable';
import { Request, Response } from 'express';

import serverRooms from '../../variables/serverRooms';

export const getInitialMusic = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;

    if (!serverRooms[uuid]?.streams?.[0]) throw Error('stream을 찾을 수 없습니다');

    const stream = cloneable(serverRooms[uuid].streams[0]);

    for await (const chunk of stream) {
      res.write(chunk);
    }

    res.end();
  } catch (error) {
    console.error(error);
    res.end();
  }
};

export const getNextMusic = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;

    if (!serverRooms[uuid]?.streams?.[1]) throw Error('stream을 찾을 수 없습니다');

    const stream = cloneable(serverRooms[uuid].streams[1]);

    for await (const chunk of stream) {
      res.write(chunk);
    }

    res.end();
  } catch (error) {
    console.error(error);
    res.end();
  }
};
