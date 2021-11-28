import { Socket } from 'socket.io';

import { SocketEvents } from '~/types/SocketEvents';
import serverRooms from '~/variables/serverRooms';

function handleCheckEnter(this: Socket, { uuid, nickname, color }: { uuid: string; nickname: string; color: string }) {
  try {
    const socket = this;
    if (!serverRooms[uuid]) return;

    const res = Object.values(serverRooms[uuid].players).some(
      ({ nickname: n, color: c }) => nickname === n && color === c,
    );
    socket.emit(SocketEvents.CHECK_ENTER, !res);
  } catch (error) {
    console.error(error);
  }
}

const onCheckEnter = (socket: Socket) => {
  socket.on(SocketEvents.CHECK_ENTER, handleCheckEnter);
};
export default onCheckEnter;
