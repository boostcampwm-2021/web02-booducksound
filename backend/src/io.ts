import short from 'short-uuid';
import socketio from 'socket.io';

import * as UserService from './resources/playList/service';
import { LobbyRoom } from './types/LobbyRoom';
import { Player } from './types/Player';
import { ServerRoom } from './types/ServerRoom';
import { SocketEvents } from './types/SocketEvents';
import { search as searchY } from './utils/crawler';
import { getLobbyRoom, getGameRoom } from './utils/rooms';
import streamify from './utils/streamify';
import serverRooms from './variables/serverRooms';

const replaceText = (str: string) => {
  return str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/ ]/gim, '').toLowerCase();
};

const resetSkip = (uuid: string) => {
  Object.keys(serverRooms[uuid].players).forEach((key) => (serverRooms[uuid].players[key].skip = false));
};

const clearTimer = (timer: NodeJS.Timeout | null) => {
  if (!timer) return;
  clearTimeout(timer);
};

const setHintTimer = (serverRoom: ServerRoom, uuid: string) => {
  serverRoom.timer = setTimeout(() => {
    io.to(uuid).emit(SocketEvents.SHOW_HINT, serverRoom.musics[serverRoom.curRound - 1].hint);
  }, serverRoom.timePerProblem * 500);
};

const setRoundTimer = (serverRoom: ServerRoom, uuid: string) => {
  clearTimer(serverRoom.timer);
  setHintTimer(serverRoom, uuid);
  serverRoom.timer = setTimeout(() => {
    serverRoom.status = 'resting';
    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
    getNextRound(uuid, { type: 'TIMEOUT' });
  }, serverRoom.timePerProblem * 1000);
};

const setWaitTimer = (serverRoom: ServerRoom, uuid: string, isExistNext: boolean) => {
  clearTimer(serverRoom.timer);
  serverRoom.timer = setTimeout(() => {
    serverRoom.status = 'playing';
    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
    io.to(uuid).emit(SocketEvents.NEXT_ROUND, isExistNext);
    setRoundTimer(serverRoom, uuid);
  }, 5000);
};

const getNextRound = (uuid: string, { type, who }: { type: 'SKIP' | 'ANSWER' | 'TIMEOUT'; who?: string }) => {
  const gameEnd = (uuid: string) => {
    serverRooms[uuid].curRound = 1;
    serverRooms[uuid].status = 'waiting';
    serverRooms[uuid].skipCount = 0;
    serverRooms[uuid].streams = [];
    Object.keys(serverRooms[uuid].players).forEach((key) => {
      if (serverRooms[uuid].players[key].status !== 'king') serverRooms[uuid].players[key].status = 'prepare';
    });
    resetSkip(uuid);
    clearTimer(serverRooms[uuid].timer);

    // TODO: stream destroy
    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
    io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, getLobbyRoom(uuid));
    io.to(uuid).emit(SocketEvents.GAME_END);
  };

  try {
    const { curRound, maxRound, musics } = serverRooms[uuid];

    if (curRound === maxRound) {
      io.to(uuid).emit(SocketEvents.ROUND_END, { type, info: musics[curRound - 1].info, who });
      setTimeout(() => gameEnd(uuid), 5000);
      return;
    }

    serverRooms[uuid].curRound += 1;
    serverRooms[uuid].streams.shift(); // TODO: Queue 자료형으로 구현할 것
    // TODO: stream ffmpeg destroy

    if (curRound + 1 < musics.length) {
      serverRooms[uuid].streams.push(streamify(musics[curRound + 1].url));
    }

    // TODO: 플레이어들의 상태 answer 같은 것들 초기화
    // TODO: 힌트 같은 것들도 초기화
    serverRooms[uuid].skipCount = 0;
    resetSkip(uuid);
    io.to(uuid).emit(SocketEvents.ROUND_END, { type, info: musics[curRound - 1].info, who });

    setWaitTimer(serverRooms[uuid], uuid, curRound + 1 < musics.length);
  } catch (error) {
    console.error(error);
  }
};

const io = new socketio.Server();

io.on('connection', (socket) => {
  const leaveRoom = (uuid: string) => {
    if (!serverRooms[uuid]?.players[socket.id]) return;

    const isKing = serverRooms[uuid].players[socket.id].status === 'king';
    socket.leave(uuid);
    delete serverRooms[uuid].players[socket.id];

    if (!Object.keys(serverRooms[uuid].players).length) {
      if (serverRooms[uuid].timer) clearTimer(serverRooms[uuid].timer);
      delete serverRooms[uuid];
      io.emit(SocketEvents.DELETE_LOBBY_ROOM, uuid);
      return;
    }

    if (isKing) {
      serverRooms[uuid].players[Object.keys(serverRooms[uuid].players)[0]].status = 'king';
    }

    delete serverRooms[uuid].players[socket.id];

    io.emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));

    const lobbyRoom = getLobbyRoom(uuid);
    io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, lobbyRoom);
  };

  socket.on(SocketEvents.SET_LOBBY_ROOMS, (done) => {
    try {
      const lobbyRooms: { [uuid: string]: LobbyRoom } = {};
      Object.keys(serverRooms).forEach((uuid) => {
        lobbyRooms[uuid] = getLobbyRoom(uuid) as LobbyRoom;
      });
      done(lobbyRooms);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on(SocketEvents.CREATE_ROOM, async (room, done) => {
    try {
      const { title, playlistId, playlistName, password, skip, timePerProblem } = room;
      const uuid = short.generate();

      const setRoomInfo = async (playlistId: string) => {
        const playlist = await UserService.getById(playlistId);
        const serverRoom: ServerRoom = {
          title,
          password,
          players: {},
          playlistId,
          playlistName,
          hashtags: playlist.hashtags,
          skip,
          timePerProblem,
          status: 'waiting',
          musics: playlist.musics,
          curRound: 1,
          maxRound: playlist.musics.length,
          skipCount: 0,
          streams: [],
          timer: null,
        };
        serverRooms[uuid] = serverRoom;
        done(uuid);
        // TODO: 방장은 원래 GAME_START가 비활성화 되어있다가, done()을 받고서야 누를 수 있도록 할 것
        // 데이터베이스와 통신하는데 시간이 걸리므로 serverRooms[uuid]가 세팅되고 나서야 플레이를 누를 수 있게 해야한다
      };
      await setRoomInfo(playlistId);
      const lobbyRoom = getLobbyRoom(uuid);
      io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, lobbyRoom);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on(SocketEvents.SET_GAME_ROOM, (uuid, password, room, done) => {
    try {
      if (room === undefined) return;
      const { title, playlistId, playlistName, skip, timePerProblem } = room;

      serverRooms[uuid] = { ...serverRooms[uuid], title, playlistId, playlistName, skip, timePerProblem };

      if (password) serverRooms[uuid] = { ...serverRooms[uuid], password };

      io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
      const lobbyRoom = getLobbyRoom(uuid);
      io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, lobbyRoom);

      done();
    } catch (error) {
      console.error(error);
    }
  });

  socket.on(SocketEvents.JOIN_ROOM, (uuid: string, player: Player, done) => {
    try {
      if (!serverRooms[uuid]) {
        done({ type: 'fail', message: '존재 하지 않는 방입니다' });
        return;
      }
      socket.join(uuid);

      const { nickname, color } = player;

      serverRooms[uuid].players = {
        ...serverRooms[uuid].players,
        ...{
          [socket.id]: {
            nickname,
            color,
            status: Object.keys(serverRooms[uuid].players).length ? 'prepare' : 'king',
            skip: false,
            score: 0,
          },
        },
      };
      const gameRoom = getGameRoom(uuid);
      const lobbyRoom = getLobbyRoom(uuid);

      io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
      io.to(uuid).emit(SocketEvents.RECEIVE_CHAT, { name: nickname, text: '', status: 'alert' });

      done({ type: 'success', gameRoom });
      io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, lobbyRoom);
    } catch (error) {
      console.error(error);
    }

    socket.on('disconnect', () => {
      try {
        leaveRoom(uuid);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on(SocketEvents.START_GAME, () => {
      try {
        // TODO: !serverRooms[uuid] 인 경우에는 실행이 안 되도록
        console.log(serverRooms[uuid]);
        const { musics } = serverRooms[uuid];
        serverRooms[uuid].status = 'playing';
        serverRooms[uuid].streams = [streamify(musics[0].url), streamify(musics[1].url)];
        io.to(uuid).emit(SocketEvents.START_GAME, getGameRoom(uuid));
        io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, getLobbyRoom(uuid));
        setRoundTimer(serverRooms[uuid], uuid);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on(SocketEvents.SKIP, (uuid: string, id: string) => {
      try {
        if (serverRooms[uuid].players[id].skip) return;

        serverRooms[uuid].players[id].skip = true;
        serverRooms[uuid].skipCount += 1;
        io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));

        if (serverRooms[uuid].skipCount === Object.keys(serverRooms[uuid].players).length) {
          getNextRound(uuid, { type: 'SKIP' });
        }
      } catch (error) {
        console.error(error);
      }
    });
  });

  socket.on(SocketEvents.SET_PLAYER, (uuid: string, player: Player) => {
    try {
      serverRooms[uuid].players[socket.id] = player;
      io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
    } catch (error) {
      console.error(error);
    }
  });

  socket.on(SocketEvents.LEAVE_ROOM, (uuid: string) => {
    try {
      leaveRoom(uuid);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on(SocketEvents.COMPARE_PWD, (uuid: string, code: string, done) => {
    if (!code) return;
    if (serverRooms[uuid].password === code) done(true);
    else done(false);
  });
  socket.on(SocketEvents.SEND_CHAT, (uuid: string, name: string, text: string, color: string) => {
    try {
      const currentMusicInfo = serverRooms[uuid]?.musics[serverRooms[uuid].curRound - 1];
      const isAnswer = currentMusicInfo.answers.some((answer) => replaceText(answer) === replaceText(text));

      if (serverRooms[uuid].status === 'waiting' || !isAnswer) {
        return io.to(uuid).emit(SocketEvents.RECEIVE_CHAT, { name, text, status: 'message', color });
      }
      serverRooms[uuid].players[socket.id].score += 100;
      serverRooms[uuid].status = 'resting';
      io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
      io.to(uuid).emit(SocketEvents.RECEIVE_ANSWER, { uuid, name, text: '', status: 'answer' });
      getNextRound(uuid, { type: 'ANSWER', who: name });
    } catch (error) {
      console.error(error);
    }
  });

  socket.on(SocketEvents.SEARCH_URL, async (search: string, done) => {
    const result = await searchY(search);
    done(
      result.map((element) => {
        return {
          title: element.snippet.title,
          url: element.snippet.url,
          thumbnails: element.snippet.thumbnails.url,
        };
      }),
    );
  });
});

export default io;
