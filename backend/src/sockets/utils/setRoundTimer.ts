import clearTimer from './clearTimer';
import getGameRoom from './getGameRoom';
import getNextRound from './getNextRound';

import io from '~/sockets/io';
import { ServerRoom } from '~/types/ServerRoom';
import { SocketEvents } from '~/types/SocketEvents';

const setRoundTimer = (serverRoom: ServerRoom, uuid: string) => {
  clearTimer(serverRoom.timer);

  serverRoom.timer = setTimeout(() => {
    if (!serverRoom) return;

    serverRoom.status = 'resting';
    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
    getNextRound(uuid, { type: 'TIMEOUT' });
  }, serverRoom.timePerProblem * 1000);
};

export default setRoundTimer;
