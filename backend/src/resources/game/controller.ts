import { Request, Response } from 'express';

import streamify from '../../utils/streamify';

export const getMusic = async (req: Request, res: Response) => {
  const { uuid, round } = req.params;

  // TODO: serverRooms[uuid].musics[round] 에서 music을 가져올 것

  try {
    for await (const chunk of streamify('Ec7TN_11az8')) {
      res.write(chunk);
    }
    res.end();
  } catch (error) {
    console.error(error);
    res.end();
  }
};
