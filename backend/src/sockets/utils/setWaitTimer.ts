import clearTimer from './clearTimer';
import getGameRoom from './getGameRoom';
import setHintTimer from './setHintTimer';
import setRoundTimer from './setRoundTimer';

import io from '~/sockets/io';
import { ServerRoom } from '~/types/ServerRoom';
import { SocketEvents } from '~/types/SocketEvents';
import Youtubestream from '~/variables/YoutubeStream';

const setWaitTimer = (serverRoom: ServerRoom, uuid: string, isExistNext: boolean) => {
  clearTimer(serverRoom.timer);

  serverRoom.timer = setTimeout(() => {
    if (!serverRoom) return;

    const { curRound, musics } = serverRoom;
    serverRoom.status = 'playing';

    if (curRound < musics.length) {
      serverRoom.streams.push(new Youtubestream(musics[curRound].url));
    }

    const endTime = Date.now() + serverRoom.timePerProblem * 1000;
    io.to(uuid).emit(SocketEvents.NEXT_ROUND, isExistNext, endTime);
    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
    setHintTimer(serverRoom, uuid);
    setRoundTimer(serverRoom, uuid);
  }, 5000);
};

export default setWaitTimer;
