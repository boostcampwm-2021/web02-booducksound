import { Socket } from 'socket.io';

import { SocketEvents } from '~/types/SocketEvents';
import serverRooms from '~/variables/serverRooms';

const handleGetRoomPassword = (uuid: string, done: Function) => {
  done(serverRooms[uuid].password);
};

const onGetRoomPassword = (socket: Socket) => {
  socket.on(SocketEvents.GET_ROOM_PASSWORD, handleGetRoomPassword);
};

export default onGetRoomPassword;
