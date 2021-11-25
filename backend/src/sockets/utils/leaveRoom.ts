import { Socket } from 'socket.io';

import clearTimer from './clearTimer';
import getGameRoom from './getGameRoom';
import getLobbyRoom from './getLobbyRoom';

import io from '~/sockets/io';
import { SocketEvents } from '~/types/SocketEvents';
import serverRooms from '~/variables/serverRooms';

const leaveRoom = (socket: Socket, uuid: string) => {
  if (!serverRooms[uuid]?.players[socket.id]) return;

  const isKing = serverRooms[uuid].players[socket.id].status === 'king';
  socket.leave(uuid);
  delete serverRooms[uuid].players[socket.id];

  if (!Object.keys(serverRooms[uuid].players).length) {
    if (serverRooms[uuid].timer) clearTimer(serverRooms[uuid].timer);
    delete serverRooms[uuid];
    io.emit(SocketEvents.DELETE_LOBBY_ROOM, uuid);
    return;
  }

  if (isKing) {
    serverRooms[uuid].players[Object.keys(serverRooms[uuid].players)[0]].status = 'king';
  }

  io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
  io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, getLobbyRoom(uuid));
};

export default leaveRoom;
