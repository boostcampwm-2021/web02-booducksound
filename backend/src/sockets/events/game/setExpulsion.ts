import { Socket } from 'socket.io';

import io from '~/sockets/io';
import getGameRoom from '~/sockets/utils/getGameRoom';
import { SocketEvents } from '~/types/SocketEvents';

function handleSetExpulsion(this: Socket, uuid: string, Id: string) {
  try {
    io.to(uuid).emit(SocketEvents.SET_EXPULSION, Id);
    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
    io.to(uuid).emit(SocketEvents.RECEIVE_CHAT, {
      name: getGameRoom(uuid)?.players[Id].nickname,
      text: '님이 강퇴당하셨습니다.',
      status: 'alert',
    });
  } catch (error) {
    console.error(error);
  }
}

const onSetExpulsion = (socket: Socket) => {
  socket.on(SocketEvents.SET_EXPULSION, handleSetExpulsion);
};

export default onSetExpulsion;
