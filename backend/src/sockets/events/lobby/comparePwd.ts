import { Socket } from 'socket.io';

import { SocketEvents } from '~/types/SocketEvents';
import serverRooms from '~/variables/serverRooms';

const handleComparePwd = (uuid: string, code: string, done: Function) => {
  if (!code) return;
  if (serverRooms[uuid].password === code) done(true);
  else done(false);
};

const onComparePwd = (socket: Socket) => {
  socket.on(SocketEvents.COMPARE_PWD, handleComparePwd);
};

export default onComparePwd;
