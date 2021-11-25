import { Request, Response } from 'express';

import serverRooms from '~/variables/serverRooms';

export const getMusic = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const round = Number(req.params.round);

    if (!serverRooms[uuid]?.streams?.[round - 1]?.stream) throw Error('stream을 찾을 수 없습니다');
    const { stream } = serverRooms[uuid].streams[round - 1];

    for await (const chunk of stream) {
      res.write(chunk);
    }

    res.end();
  } catch (error) {
    console.error(error);
    res.end();
  }
};
