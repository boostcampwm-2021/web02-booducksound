import { Socket } from 'socket.io';

import io from '~/sockets/io';
import getGameRoom from '~/sockets/utils/getGameRoom';
import { SocketEvents } from '~/types/SocketEvents';
import serverRooms from '~/variables/serverRooms';

function handleSetDelegate(this: Socket, uuid: string, delegatedId: string) {
  try {
    const socket = this;
    if (!serverRooms[uuid]) return;
    serverRooms[uuid].players[socket.id].status = 'prepare';
    serverRooms[uuid].players[delegatedId].status = 'king';
    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
  } catch (error) {
    console.error(error);
  }
}

const onSetDelegate = (socket: Socket) => {
  socket.on(SocketEvents.SET_DELEGATE, handleSetDelegate);
};

export default onSetDelegate;
