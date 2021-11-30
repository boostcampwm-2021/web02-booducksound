import io from '../io';

import getGameRoom from './getGameRoom';
import getLobbyRoom from './getLobbyRoom';
import resetPlayer from './resetPlayer';

import * as PlaylistService from '~/resources/playList/service';
import clearTimer from '~/sockets/utils/clearTimer';
import { SocketEvents } from '~/types/SocketEvents';
import serverRooms from '~/variables/serverRooms';

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

export default gameEnd;
