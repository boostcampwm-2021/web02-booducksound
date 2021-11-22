import short from 'short-uuid';
import socketio from 'socket.io';

import * as PlaylistService from './resources/playList/service';
import { LobbyRoom } from './types/LobbyRoom';
import { Player } from './types/Player';
import { ServerRoom } from './types/ServerRoom';
import { SocketEvents } from './types/SocketEvents';
import { search as searchY } from './utils/crawler';
import { getLobbyRoom, getGameRoom } from './utils/rooms';
import serverRooms from './variables/serverRooms';
import Youtubestream from './variables/YoutubeStream';

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
  clearTimer(serverRoom.hintTimer);
  serverRoom.hintTimer = setTimeout(() => {
    io.to(uuid).emit(SocketEvents.SHOW_HINT, serverRoom.musics[serverRoom.curRound - 1].hint);
  }, serverRoom.timePerProblem * 500);
};

const setRoundTimer = (serverRoom: ServerRoom, uuid: string) => {
  clearTimer(serverRoom.timer);
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
    setHintTimer(serverRoom, uuid);
    setRoundTimer(serverRoom, uuid);
  }, 5000);
};

const getNextRound = (uuid: string, { type, who }: { type: 'SKIP' | 'ANSWER' | 'TIMEOUT'; who?: string }) => {
  const gameEnd = (uuid: string) => {
    serverRooms[uuid].curRound = 1;
    serverRooms[uuid].status = 'waiting';
    serverRooms[uuid].skipCount = 0;
    serverRooms[uuid].streams.forEach((stream) => stream.destroy());
    serverRooms[uuid].streams = [];
    Object.keys(serverRooms[uuid].players).forEach((key) => {
      if (serverRooms[uuid].players[key].status !== 'king') {
        serverRooms[uuid].players[key].status = 'prepare';
      } else {
        PlaylistService.incrementPlayCount(serverRooms[uuid].playlistId);
      }
    });
    resetSkip(uuid);
    clearTimer(serverRooms[uuid].timer);

    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
    io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, getLobbyRoom(uuid));
    io.to(uuid).emit(SocketEvents.GAME_END, getGameRoom(uuid));
  };

  try {
    const { curRound, maxRound, musics } = serverRooms[uuid];

    if (curRound === maxRound) {
      io.to(uuid).emit(SocketEvents.ROUND_END, { type, info: musics[curRound - 1].info, who });
      setTimeout(() => gameEnd(uuid), 5000);
      return;
    }

    serverRooms[uuid].curRound += 1;
    serverRooms[uuid].streams[0].destroy();
    serverRooms[uuid].streams.shift();

    if (curRound + 1 < musics.length) {
      serverRooms[uuid].streams.push(new Youtubestream(musics[curRound + 1].url));
    }

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
      serverRooms[uuid].streams.forEach((stream) => stream.destroy());
      delete serverRooms[uuid];
      io.emit(SocketEvents.DELETE_LOBBY_ROOM, uuid);
      return;
    }

    if (isKing) {
      serverRooms[uuid].players[Object.keys(serverRooms[uuid].players)[0]].status = 'king';
    }

    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
    io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, getLobbyRoom(uuid));
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
        const playlist = await PlaylistService.getById(playlistId);
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
          hintTimer: null,
        };
        serverRooms[uuid] = serverRoom;
        done(uuid);
      };
      await setRoomInfo(playlistId);
      const lobbyRoom = getLobbyRoom(uuid);
      io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, lobbyRoom);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on(SocketEvents.SET_GAME_ROOM, async (uuid, password, room, done) => {
    try {
      if (room === undefined) return;
      const { title, playlistId, playlistName, skip, timePerProblem } = room;
      serverRooms[uuid] = { ...serverRooms[uuid], title, playlistId, playlistName, skip, timePerProblem };

      if (password !== '********') serverRooms[uuid] = { ...serverRooms[uuid], password };
      const playlist = await PlaylistService.getById(playlistId);
      serverRooms[uuid] = {
        ...serverRooms[uuid],
        hashtags: playlist.hashtags,
        musics: playlist.musics,
        maxRound: playlist.musics.length,
      };
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
      io.to(uuid).emit(SocketEvents.RECEIVE_CHAT, { name: nickname, text: '님께서 입장하셨습니다.', status: 'alert' });

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
  });

  socket.on(SocketEvents.START_GAME, (uuid: string) => {
    try {
      if (!serverRooms[uuid]) return;
      if (serverRooms[uuid].status !== 'waiting') return;

      const { musics } = serverRooms[uuid];
      serverRooms[uuid].status = 'playing';
      serverRooms[uuid].streams = [new Youtubestream(musics[0].url), new Youtubestream(musics[1].url)];
      Object.keys(serverRooms[uuid].players).forEach((e) => {
        serverRooms[uuid].players[e].score = 0;
      });
      io.to(uuid).emit(SocketEvents.START_GAME, getGameRoom(uuid));
      io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, getLobbyRoom(uuid));
      setRoundTimer(serverRooms[uuid], uuid);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on(SocketEvents.SKIP, (uuid: string, id: string) => {
    try {
      if (!serverRooms[uuid]) return;
      if (serverRooms[uuid].status !== 'playing') return;
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

  socket.on(SocketEvents.SET_PLAYER, (uuid: string, player: Player) => {
    try {
      serverRooms[uuid].players[socket.id] = player;
      io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
    } catch (error) {
      console.error(error);
    }
  });

  socket.on(SocketEvents.SET_DELEGATE, (uuid: string, delegatedId: string) => {
    try {
      serverRooms[uuid].players[socket.id].status = 'prepare';
      serverRooms[uuid].players[delegatedId].status = 'king';
      io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
    } catch (error) {
      console.error(error);
    }
  });

  socket.on(SocketEvents.SET_EXPULSION, (uuid: string, Id: string) => {
    try {
      io.to(uuid).emit(SocketEvents.SET_EXPULSION, Id);
      io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
      io.to(uuid).emit(SocketEvents.RECEIVE_CHAT, {
        name: getGameRoom(uuid)?.players[Id].nickname,
        text: '님이 강퇴당하셨습니다.',
        status: 'alert',
      });
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
  socket.on(SocketEvents.GET_ROOM_PASSWORD, (uuid: string, done) => {
    done(serverRooms[uuid].password);
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
          title: element.title,
          url: element.url,
          thumbnails: element.thumbnails.url.split('?')[0],
        };
      }),
    );
  });
});

export default io;
