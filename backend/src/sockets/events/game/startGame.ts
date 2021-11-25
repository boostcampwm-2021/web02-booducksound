import { Socket } from 'socket.io';

import io from '~/sockets/io';
import getGameRoom from '~/sockets/utils/getGameRoom';
import getLobbyRoom from '~/sockets/utils/getLobbyRoom';
import setHintTimer from '~/sockets/utils/setHintTimer';
import setRoundTimer from '~/sockets/utils/setRoundTimer';
import { SocketEvents } from '~/types/SocketEvents';
import serverRooms from '~/variables/serverRooms';
import Youtubestream from '~/variables/YoutubeStream';

function handleStartGame(this: Socket, uuid: string) {
  try {
    if (!serverRooms[uuid]) return;
    if (serverRooms[uuid].status !== 'waiting') return;

    const { musics } = serverRooms[uuid];
    serverRooms[uuid].status = 'playing';
    serverRooms[uuid].streams = [new Youtubestream(musics[0].url), new Youtubestream(musics[1].url)];
    Object.keys(serverRooms[uuid].players).forEach((e) => {
      serverRooms[uuid].players[e].score = 0;
    });

    const endTime = Date.now() + serverRooms[uuid].timePerProblem * 1000;
    io.to(uuid).emit(SocketEvents.START_GAME, getGameRoom(uuid), endTime);
    io.emit(SocketEvents.SET_LOBBY_ROOM, uuid, getLobbyRoom(uuid));
    setRoundTimer(serverRooms[uuid], uuid);
    setHintTimer(serverRooms[uuid], uuid);
  } catch (error) {
    console.error(error);
  }
}

const onStartGame = (socket: Socket) => {
  socket.on(SocketEvents.START_GAME, handleStartGame);
};

export default onStartGame;
