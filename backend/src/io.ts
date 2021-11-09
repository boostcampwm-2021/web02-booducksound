import short from 'short-uuid';
import socketio from 'socket.io';

import { LobbyRoom } from './types/LobbyRoom';
import { ServerRoom } from './types/ServerRoom';
import { SocketEvents } from './types/SocketEvents';
import { serverRooms, getLobbyRoom, getGameRoom } from './utils/rooms';

const io = new socketio.Server();

io.on('connection', (socket) => {
  socket.on(SocketEvents.SET_LOBBY_ROOMS, (done) => {
    const lobbyRooms: { [uuid: string]: LobbyRoom } = {};
    Object.keys(serverRooms).forEach((uuid) => {
      lobbyRooms[uuid] = getLobbyRoom(uuid) as LobbyRoom;
    });
    done(lobbyRooms);
  });

  socket.on(SocketEvents.CREATE_ROOM, (room, done) => {
    const { title, playListId, password, skip, timePerProblem } = room;
    const uuid = short.generate();

    const serverRoom: ServerRoom = {
      title,
      password,
      players: {},
      playListId,
      skip,
      timePerProblem,
      status: 'waiting',
    };

    serverRooms[uuid] = serverRoom;
    done(uuid);

    const lobbyRoom = getLobbyRoom(uuid);
    io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, lobbyRoom);
  });

  socket.on(SocketEvents.JOIN_ROOM, (uuid: string, nickname: string, done) => {
    if (!serverRooms[uuid]) {
      done({ type: 'fail', message: '존재 하지 않는 방입니다' });
      return;
    }
    socket.join(uuid);

    serverRooms[uuid].players = { ...serverRooms[uuid].players, ...{ [socket.id]: { nickname } } };
    const gameRoom = getGameRoom(uuid);
    const lobbyRoom = getLobbyRoom(uuid);

    io.to(uuid).emit(SocketEvents.RECEIVE_CHAT, { name: nickname, text: '', status: 'alert' });
    done({ type: 'success', gameRoom });
    io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, lobbyRoom);

    socket.on('disconnecting', () => {
      socket.leave(uuid);
      delete serverRooms[uuid].players[socket.id];

      if (!Object.keys(serverRooms[uuid].players).length) {
        delete serverRooms[uuid];
        io.emit(SocketEvents.DELETE_LOBBY_ROOM, uuid);
        return;
      }

      const lobbyRoom = getLobbyRoom(uuid);
      io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, lobbyRoom);
    });
  });

  socket.on(SocketEvents.SEND_CHAT, (uuid: string, name: string, text: string) => {
    io.to(uuid).emit(SocketEvents.RECEIVE_CHAT, { name, text, status: 'message' });
  });
});

export default io;
