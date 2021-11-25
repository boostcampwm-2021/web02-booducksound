import { Socket } from 'socket.io';

import io from '~/sockets/io';
import getGameRoom from '~/sockets/utils/getGameRoom';
import { Player } from '~/types/Player';
import { SocketEvents } from '~/types/SocketEvents';
import serverRooms from '~/variables/serverRooms';

function handleSetPlayer(this: Socket, uuid: string, player: Player) {
  try {
    const socket = this;

    if (!serverRooms[uuid]) return;
    serverRooms[uuid].players[socket.id] = player;
    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
  } catch (error) {
    console.error(error);
  }
}

const onSetPlayer = (socket: Socket) => {
  socket.on(SocketEvents.SET_PLAYER, handleSetPlayer);
};

export default onSetPlayer;
