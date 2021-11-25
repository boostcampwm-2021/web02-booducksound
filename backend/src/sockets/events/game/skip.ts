import { Socket } from 'socket.io';

import io from '~/sockets/io';
import getGameRoom from '~/sockets/utils/getGameRoom';
import getNextRound from '~/sockets/utils/getNextRound';
import { SocketEvents } from '~/types/SocketEvents';
import serverRooms from '~/variables/serverRooms';

function handleSkip(this: Socket, uuid: string, id: string) {
  try {
    if (serverRooms[uuid].status !== 'playing') return;
    if (serverRooms[uuid].players[id].skip) return;

    serverRooms[uuid].players[id].skip = true;
    serverRooms[uuid].skipCount += 1;
    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));

    if (serverRooms[uuid].skipCount === Object.keys(serverRooms[uuid].players).length) {
      getNextRound(uuid, { type: 'SKIP' });
    }
  } catch (error) {
    console.error(error);
  }
}

const onSkip = (socket: Socket) => {
  socket.on(SocketEvents.SKIP, handleSkip);
};

export default onSkip;
