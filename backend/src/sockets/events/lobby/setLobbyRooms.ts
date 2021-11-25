import { Socket } from 'socket.io';

import getLobbyRoom from '~/sockets/utils/getLobbyRoom';
import { LobbyRoom } from '~/types/LobbyRoom';
import { SocketEvents } from '~/types/SocketEvents';
import serverRooms from '~/variables/serverRooms';

function handleSetLobbyRooms(this: Socket, done: (...args: any) => void) {
  try {
    const lobbyRooms: { [uuid: string]: LobbyRoom } = {};
    Object.keys(serverRooms).forEach((uuid) => {
      lobbyRooms[uuid] = getLobbyRoom(uuid) as LobbyRoom;
    });
    done(lobbyRooms);
  } catch (error) {
    console.error(error);
  }
}

const onSetLobbyRoom = (socket: Socket) => {
  socket.on(SocketEvents.SET_LOBBY_ROOMS, handleSetLobbyRooms);
};

export default onSetLobbyRoom;
