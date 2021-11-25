import io from '~/sockets/io';
import clearTimer from '~/sockets/utils/clearTimer';
import { ServerRoom } from '~/types/ServerRoom';
import { SocketEvents } from '~/types/SocketEvents';

const setHintTimer = (serverRoom: ServerRoom, uuid: string) => {
  clearTimer(serverRoom.hintTimer);
  serverRoom.hintTimer = setTimeout(() => {
    io.to(uuid).emit(SocketEvents.SHOW_HINT, serverRoom.musics[serverRoom.curRound - 1].hint);
  }, serverRoom.timePerProblem * 500);
};

export default setHintTimer;
