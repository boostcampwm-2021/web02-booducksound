import { Socket } from 'socket.io';

import leaveRoom from '~/sockets/utils/leaveRoom';
import { SocketEvents } from '~/types/SocketEvents';

function handleLeaverRoom(this: Socket, uuid: string) {
  try {
    const socket = this;
    leaveRoom(socket, uuid);
  } catch (error) {
    console.error(error);
  }
}

const onLeaveRoom = (socket: Socket) => {
  socket.on(SocketEvents.LEAVE_ROOM, handleLeaverRoom);
};

export default onLeaveRoom;
