import { GameRoom } from '~/types/GameRoom';
import serverRooms from '~/variables/serverRooms';

const getGameRoom = (uuid: string) => {
  const serverRoom = serverRooms[uuid];
  if (!serverRoom) return null;

  const gameRoom: GameRoom = {
    hasPassword: !!serverRoom.password,
    playlistId: serverRoom.playlistId,
    playlistName: serverRoom.playlistName,
    hashtags: serverRoom.hashtags,
    players: serverRoom.players,
    needAnswerRatio: serverRoom.needAnswerRatio,
    status: serverRoom.status,
    curRound: serverRoom.curRound,
    maxRound: serverRoom.maxRound,
    timePerProblem: serverRoom.timePerProblem,
    title: serverRoom.title,
    isAllReady: Object.keys(serverRoom.players).every((socketId) => serverRoom.players[socketId].status !== 'prepare'),
  };

  return gameRoom;
};

export default getGameRoom;
