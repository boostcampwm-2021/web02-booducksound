import cloneable from 'cloneable-readable';
import { Request, Response } from 'express';

import { serverRooms } from '../../utils/rooms';

export const getInitialMusic = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  if (!serverRooms[uuid]?.streams?.[0]) {
    res.end();
    return;
  }

  try {
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
  const { uuid } = req.params;

  if (!serverRooms[uuid]?.streams?.[1]) {
    res.end();
    return;
  }

  try {
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
