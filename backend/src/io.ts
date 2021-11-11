import short from 'short-uuid';
import socketio from 'socket.io';

import { LobbyRoom } from './types/LobbyRoom';
import { Player } from './types/Player';
import { ServerRoom } from './types/ServerRoom';
import { SocketEvents } from './types/SocketEvents';
import { serverRooms, getLobbyRoom, getGameRoom } from './utils/rooms';

const io = new socketio.Server();

io.on('connection', (socket) => {
  const leaveRoom = (uuid: string) => {
    if (!serverRooms[uuid]?.players[socket.id]) return;

    const isKing = serverRooms[uuid].players[socket.id].status === 'king';
    socket.leave(uuid);
    delete serverRooms[uuid].players[socket.id];

    if (!Object.keys(serverRooms[uuid].players).length) {
      delete serverRooms[uuid];
      io.emit(SocketEvents.DELETE_LOBBY_ROOM, uuid);
      return;
    }

    if (isKing) {
      serverRooms[uuid].players[Object.keys(serverRooms[uuid].players)[0]].status = 'king';
    }

    delete serverRooms[uuid].players[socket.id];
    io.to(uuid).emit(SocketEvents.SET_PLAYER, { players: serverRooms[uuid].players });

    const lobbyRoom = getLobbyRoom(uuid);
    io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, lobbyRoom);
  };

  socket.on(SocketEvents.SET_LOBBY_ROOMS, (done) => {
    const lobbyRooms: { [uuid: string]: LobbyRoom } = {};
    Object.keys(serverRooms).forEach((uuid) => {
      lobbyRooms[uuid] = getLobbyRoom(uuid) as LobbyRoom;
    });
    done(lobbyRooms);
  });

  socket.on(SocketEvents.CREATE_ROOM, (room, done) => {
    const { title, playlistId, playlistName, password, skip, timePerProblem } = room;
    const uuid = short.generate();

    const serverRoom: ServerRoom = {
      title,
      password,
      players: {},
      playlistId,
      playlistName,
      skip,
      timePerProblem,
      status: 'waiting',
    };

    serverRooms[uuid] = serverRoom;
    done(uuid);

    const lobbyRoom = getLobbyRoom(uuid);
    io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, lobbyRoom);
  });

  socket.on(SocketEvents.SET_GAME_ROOM, (uuid, password, room, done) => {
    if (room === undefined) return;
    const { title, playlistId, playlistName, skip, timePerProblem } = room;
    console.log('이전', getGameRoom(uuid));
    serverRooms[uuid] = { ...serverRooms[uuid], title, playlistId, playlistName, skip, timePerProblem };
    password !== '' ? (serverRooms[uuid] = { ...serverRooms[uuid], password }) : null;
    console.log('이후', getGameRoom(uuid));
    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
    const lobbyRoom = getLobbyRoom(uuid);
    io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, lobbyRoom);

    done();
  });

  socket.on(SocketEvents.JOIN_ROOM, (uuid: string, player: Player, done) => {
    if (!serverRooms[uuid]) {
      done({ type: 'fail', message: '존재 하지 않는 방입니다' });
      return;
    }
    socket.join(uuid);

    const { nickname, color } = player;

    serverRooms[uuid].players = {
      ...serverRooms[uuid].players,
      ...{
        [socket.id]: { nickname, color, status: Object.keys(serverRooms[uuid].players).length ? 'prepare' : 'king' },
      },
    };
    const gameRoom = getGameRoom(uuid);
    const lobbyRoom = getLobbyRoom(uuid);

    const serverRoom = serverRooms[uuid];

    io.to(uuid).emit(SocketEvents.SET_PLAYER, { players: serverRoom.players });
    io.to(uuid).emit(SocketEvents.RECEIVE_CHAT, { name: nickname, text: '', status: 'alert' });

    done({ type: 'success', gameRoom });
    io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, lobbyRoom);

    socket.on('disconnecting', () => {
      leaveRoom(uuid);
    });

    socket.on(SocketEvents.START_GAME, () => {
      io.to(uuid).emit(SocketEvents.START_GAME);
    });

    socket.on(SocketEvents.NEXT_ROUND, () => {
      io.to(uuid).emit(SocketEvents.NEXT_ROUND);
    });
  });

  socket.on(SocketEvents.SET_PLAYER, (uuid: string, player: Player) => {
    serverRooms[uuid].players[socket.id] = player;
    io.to(uuid).emit(SocketEvents.SET_PLAYER, { players: serverRooms[uuid].players });
  });

  socket.on(SocketEvents.LEAVE_ROOM, (uuid: string) => {
    leaveRoom(uuid);
  });

  socket.on(SocketEvents.SEND_CHAT, (uuid: string, name: string, text: string) => {
    io.to(uuid).emit(SocketEvents.RECEIVE_CHAT, { name, text, status: 'message' });
  });
});

export default io;
