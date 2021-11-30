import gameEnd from './gameEnd';
import getGameRoom from './getGameRoom';
import resetPlayer from './resetPlayer';

import io from '~/sockets/io';
import setWaitTimer from '~/sockets/utils/setWaitTimer';
import { SocketEvents } from '~/types/SocketEvents';
import serverRooms from '~/variables/serverRooms';

const getNextRound = (
  uuid: string,
  { type, answerCount }: { type: 'SKIP' | 'ANSWER' | 'TIMEOUT'; answerCount?: number },
) => {
  try {
    const { curRound, maxRound, musics } = serverRooms[uuid];
    serverRooms[uuid].status = 'resting';
    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));

    if (curRound === maxRound) {
      serverRooms[uuid].status = 'waiting';
      io.to(uuid).emit(SocketEvents.ROUND_END, { type, info: musics[curRound - 1].info, answerCount });
      setTimeout(() => gameEnd(uuid), 5000);
      return;
    }

    serverRooms[uuid].curRound += 1;
    serverRooms[uuid].skipCount = 0;
    serverRooms[uuid].answerCount = 0;
    resetPlayer(uuid);
    io.to(uuid).emit(SocketEvents.ROUND_END, { type, info: musics[curRound - 1].info, answerCount });

    setWaitTimer(serverRooms[uuid], uuid, curRound + 1 < musics.length);
  } catch (error) {
    console.error(error);
  }
};

export default getNextRound;
