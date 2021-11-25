import { Socket } from 'socket.io';

import * as PlaylistService from '~/resources/playList/service';
import io from '~/sockets/io';
import getGameRoom from '~/sockets/utils/getGameRoom';
import getLobbyRoom from '~/sockets/utils/getLobbyRoom';
import InitRoomInfo from '~/types/InitRoomInfo';
import { SocketEvents } from '~/types/SocketEvents';
import serverRooms from '~/variables/serverRooms';

async function handleSetGameRoom(
  this: Socket,
  uuid: string,
  password: string,
  room: InitRoomInfo,
  done: (...argv: any) => void,
) {
  try {
    if (!room) return;

    const { title, playlistId, playlistName, needAnswerRatio, timePerProblem } = room;
    const playlist = await PlaylistService.getById(playlistId);

    serverRooms[uuid] = {
      ...serverRooms[uuid],
      title,
      playlistId,
      playlistName,
      needAnswerRatio,
      timePerProblem,
      password,
      hashtags: playlist.hashtags,
      musics: playlist.musics,
      maxRound: playlist.musics.length,
    };

    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));
    io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, getLobbyRoom(uuid));

    done();
  } catch (error) {
    console.error(error);
  }
}

const onSetGameRoom = (socket: Socket) => {
  socket.on(SocketEvents.SET_GAME_ROOM, handleSetGameRoom);
};

export default onSetGameRoom;
