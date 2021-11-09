import short from 'short-uuid';
import socketio from 'socket.io';

import { GameRoom } from './types/GameRoom';
import { LobbyRoom } from './types/LobbyRoom';
import { Player } from './types/Player';
import { ServerRoom } from './types/ServerRoom';
import { SocketEvents } from './types/SocketEvents';

const io = new socketio.Server();

const serverRooms: { [uuid: string]: ServerRoom } = {};

io.on('connection', (socket) => {
  socket.on(SocketEvents.SET_LOBBY_ROOMS, (done) => {
    // TODO: LobbyRooms를 class의 getter를 통해 정의해놓고 갖다 쓰자.

    const lobbyRooms: { [uuid: string]: LobbyRoom } = {};
    Object.entries(serverRooms).forEach(([uuid, serverRoom]) => {
      lobbyRooms[uuid] = {
        title: serverRoom.title,
        curPeople: serverRoom.players.length,
        maxPeople: 8, // TODO: 방 슬롯 열고 닫는 거에 따라 maxPeople 설정
        hasPassword: !!serverRoom.password,
        hashtags: ['해시태그1', '해시태그2'], // TODO: playlistId를 통해 hashtags 가져오기
        playlistName: '플레이리스트이름', // TODO: playlistId를 통해 playlistName 가져오기
        status: serverRoom.status,
      };
    });

    done(lobbyRooms);
  });

  socket.on(SocketEvents.CREATE_ROOM, (room, done) => {
    const { title, playListId, password, skip, timePerProblem } = room;

    const uuid = short.generate();
    const players: Player[] = [];

    const serverRoom: ServerRoom = {
      title,
      password,
      players,
      playListId,
      skip,
      timePerProblem,
      status: 'waiting',
    };

    serverRooms[uuid] = serverRoom;
    done(uuid);

    // TODO: 모든 socket이 아니라 lobby에 있는 socket에게만 발동시키면 좋다
    const lobbyRoom = {
      title: serverRoom.title,
      curPeople: serverRoom.players.length,
      maxPeople: 8, // TODO: 방 슬롯 열고 닫는 거에 따라 maxPeople 설정
      hasPassword: !!serverRoom.password,
      hashtags: ['해시태그1', '해시태그2'], // TODO: playlistId를 통해 hashtags 가져오기
      playlistName: '플레이리스트이름', // TODO: playlistId를 통해 playlistName 가져오기
      status: serverRoom.status,
    };

    // TODO: LobbyRooms는 class의 getter를 이용해서 정의해놓고 쓸 것
    io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, lobbyRoom);
  });

  socket.on(SocketEvents.JOIN_ROOM, (uuid: string, data: Player, done) => {
    if (!serverRooms[uuid]) {
      done({ type: 'fail', messsage: '존재 하지 않는 방입니다' });
      return;
    }
    socket.join(uuid);
    serverRooms[uuid].players.push({
      socketId: socket.id,
      nickname: data.nickname,
      color: data.color,
      status: serverRooms[uuid].players.length === 0 ? 'king' : 'prepare',
    });
    const serverRoom = serverRooms[uuid];

    const gameRoom: GameRoom = {
      hasPassword: !!serverRoom.password,
      playListId: serverRoom.playListId,
      players: serverRoom.players,
      skip: serverRoom.skip,
      status: serverRoom.status,
      timePerProblem: serverRoom.timePerProblem,
      title: serverRoom.title,
    };
    io.to(uuid).emit(SocketEvents.UPDATE_ROOM, { players: serverRoom.players });
    io.to(uuid).emit(SocketEvents.RECEIVE_CHAT, { name: data.nickname, text: '', status: 'alert' });
    done({ type: 'success', gameRoom });
  });

  socket.on(SocketEvents.SEND_CHAT, (uuid: string, name: string, text: string) => {
    io.to(uuid).emit(SocketEvents.RECEIVE_CHAT, { name, text, status: 'message' });
  });
});

export default io;
