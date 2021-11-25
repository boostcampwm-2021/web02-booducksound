import short from 'short-uuid';
import { Socket } from 'socket.io';

import * as PlaylistService from '~/resources/playList/service';
import getLobbyRoom from '~/sockets/utils/getLobbyRoom';
import InitRoomInfo from '~/types/InitRoomInfo';
import { ServerRoom } from '~/types/ServerRoom';
import { SocketEvents } from '~/types/SocketEvents';
import serverRooms from '~/variables/serverRooms';

const setRoomInfo = async (room: InitRoomInfo) => {
  const { title, playlistId, playlistName, password, needAnswerRatio, timePerProblem } = room;
  const playlist = await PlaylistService.getById(playlistId);

  const serverRoom: ServerRoom = {
    title,
    password,
    players: {},
    playlistId,
    playlistName,
    hashtags: playlist.hashtags,
    needAnswerRatio,
    timePerProblem,
    status: 'waiting',
    musics: playlist.musics,
    curRound: 1,
    maxRound: playlist.musics.length,
    answerCount: 0,
    skipCount: 0,
    streams: [],
    timer: null,
    hintTimer: null,
  };
  const uuid = short.generate();
  serverRooms[uuid] = serverRoom;
  return uuid;
};

async function handleCreateRoom(this: Socket, room: any, done: (...argv: any) => void) {
  try {
    const socket = this;
    const uuid = await setRoomInfo(room);
    const lobbyRoom = getLobbyRoom(uuid);
    done(uuid);
    socket.broadcast.emit(SocketEvents.SET_LOBBY_ROOM, uuid, lobbyRoom);
  } catch (error) {
    console.error(error);
  }
}

const onCreateRoom = (socket: Socket) => {
  socket.on(SocketEvents.CREATE_ROOM, handleCreateRoom);
};

export default onCreateRoom;
