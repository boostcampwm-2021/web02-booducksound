import { GameRoom } from '../types/GameRoom';
import { LobbyRoom } from '../types/LobbyRoom';
import serverRooms from '../variables/serverRooms';

export const getLobbyRoom = (uuid: string) => {
  const serverRoom = serverRooms[uuid];
  if (!serverRoom) return null;

  const lobbyRoom: LobbyRoom = {
    title: serverRoom.title,
    curPeople: Object.keys(serverRoom.players).length,
    maxPeople: 8,
    hasPassword: !!serverRoom.password,
    hashtags: serverRoom.hashtags,
    playlistName: serverRoom.playlistName,
    status: serverRoom.status,
  };

  return lobbyRoom;
};

export const getGameRoom = (uuid: string) => {
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
