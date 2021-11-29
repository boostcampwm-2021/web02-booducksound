import getGameRoom from './getGameRoom';
import getLobbyRoom from './getLobbyRoom';
import resetPlayer from './resetPlayer';

import * as PlaylistService from '~/resources/playList/service';
import io from '~/sockets/io';
import clearTimer from '~/sockets/utils/clearTimer';
import setWaitTimer from '~/sockets/utils/setWaitTimer';
import { SocketEvents } from '~/types/SocketEvents';
import serverRooms from '~/variables/serverRooms';

const getNextRound = (
  uuid: string,
  { type, answerCount }: { type: 'SKIP' | 'ANSWER' | 'TIMEOUT'; answerCount?: number },
) => {
  const gameEnd = (uuid: string) => {
    if (!serverRooms[uuid]) return;

    serverRooms[uuid].curRound = 1;
    serverRooms[uuid].status = 'waiting';
    serverRooms[uuid].skipCount = 0;
    serverRooms[uuid].answerCount = 0;
    serverRooms[uuid].streams = [];
    Object.keys(serverRooms[uuid].players).forEach((key) => {
      if (serverRooms[uuid].players[key].status !== 'king') {
        serverRooms[uuid].players[key].status = 'prepare';
      } else {
        PlaylistService.incrementPlayCount(serverRooms[uuid].playlistId);
      }
    });
    resetPlayer(uuid);
    clearTimer(serverRooms[uuid].timer);

    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
    io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, getLobbyRoom(uuid));
    io.to(uuid).emit(SocketEvents.GAME_END, getGameRoom(uuid));
  };

  try {
    const { curRound, maxRound, musics } = serverRooms[uuid];

    if (curRound === maxRound) {
      serverRooms[uuid].status = 'waiting';
      io.to(uuid).emit(SocketEvents.ROUND_END, { type, info: musics[curRound - 1].info, answerCount });
      setTimeout(() => gameEnd(uuid), 5000);
      return;
    }

    serverRooms[uuid].curRound += 1;
    serverRooms[uuid].skipCount = 0;
    serverRooms[uuid].answerCount = 0;
    resetPlayer(uuid);
    io.to(uuid).emit(SocketEvents.ROUND_END, { type, info: musics[curRound - 1].info, answerCount });

    setWaitTimer(serverRooms[uuid], uuid, curRound + 1 < musics.length);
  } catch (error) {
    console.error(error);
  }
};

export default getNextRound;
