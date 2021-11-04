import short from 'short-uuid';
import socketio from 'socket.io';

import { SocketEvents } from './types/SocketEvents';

const io = new socketio.Server();

type Player = {
  socketId: string;
  nickname: string;
};

type ROOM = {
  players: Player[];
  title: string;
  playListId: string;
  password: string | null;
  skip: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  timePerProblem: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
};

const rooms: { [uuid: string]: ROOM } = {};

io.on('connection', (socket) => {
  socket.on(SocketEvents.CREATE_ROOM, (room, done) => {
    const { title, playListId, password, skip, timePerProblem } = room;

    const uuid = short.generate();
    const players: Player[] = [{ socketId: socket.id, nickname: 'TODO: 닉네임 설정' }];

    rooms[uuid] = { title, playListId, password, skip, timePerProblem, players };

    done(uuid);
  });

  socket.on(SocketEvents.JOIN_ROOM, (uuid, done) => {
    if (!rooms[uuid]) {
      done({ type: 'fail', messsage: '존재 하지 않는 방입니다' });
    }

    const { players, title, playListId, password } = rooms[uuid];

    // done(ROOMS[uuid]);
  });
});

export default io;
