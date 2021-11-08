import short from 'short-uuid';
import socketio from 'socket.io';

import { GameRoom } from './types/GameRoom';
import { Player } from './types/Player';
import { ServerRoom } from './types/ServerRoom';
import { SocketEvents } from './types/SocketEvents';

const io = new socketio.Server();

const serverRooms: { [uuid: string]: ServerRoom } = {};

io.on('connection', (socket) => {
  socket.on(SocketEvents.CREATE_ROOM, (room, done) => {
    const { title, playListId, password, skip, timePerProblem } = room;

    const uuid = short.generate();
    const players: Player[] = [{ socketId: socket.id, nickname: 'TODO: 닉네임 설정' }];

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
  });

  socket.on(SocketEvents.JOIN_ROOM, (uuid: string, done) => {
    if (!serverRooms[uuid]) {
      done({ type: 'fail', messsage: '존재 하지 않는 방입니다' });
    }

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

    done({ type: 'success', gameRoom });
  });
});

export default io;
