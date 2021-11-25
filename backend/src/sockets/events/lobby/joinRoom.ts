import { Socket } from 'socket.io';

import io from '~/sockets/io';
import getGameRoom from '~/sockets/utils/getGameRoom';
import getLobbyRoom from '~/sockets/utils/getLobbyRoom';
import leaveRoom from '~/sockets/utils/leaveRoom';
import { Player } from '~/types/Player';
import { SocketEvents } from '~/types/SocketEvents';
import serverRooms from '~/variables/serverRooms';

function handleJoinRoom(this: Socket, uuid: string, player: Player, done: (...argv: any) => void) {
  try {
    const socket = this;

    if (!serverRooms[uuid]) {
      done({ type: 'fail', message: '존재 하지 않는 방입니다' });
      return;
    }

    socket.join(uuid);
    socket.on('disconnect', () => leaveRoom(socket, uuid));

    const { nickname, color } = player;

    serverRooms[uuid].players = {
      ...serverRooms[uuid].players,
      ...{
        [socket.id]: {
          nickname,
          color,
          status: Object.keys(serverRooms[uuid].players).length ? 'prepare' : 'king',
          skip: false,
          answer: false,
          score: 0,
        },
      },
    };
    const gameRoom = getGameRoom(uuid);
    const lobbyRoom = getLobbyRoom(uuid);

    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
    io.to(uuid).emit(SocketEvents.RECEIVE_CHAT, { name: nickname, text: '님께서 입장하셨습니다.', status: 'alert' });

    done({ type: 'success', gameRoom });
    io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, lobbyRoom);
  } catch (error) {
    console.error(error);
  }
}

const onJoinroom = (socket: Socket) => {
  socket.on(SocketEvents.JOIN_ROOM, handleJoinRoom);
};

export default onJoinroom;
