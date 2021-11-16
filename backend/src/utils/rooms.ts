import { GameRoom } from '../types/GameRoom';
import { LobbyRoom } from '../types/LobbyRoom';
import serverRooms from '../variables/serverRooms';

export const getLobbyRoom = (uuid: string) => {
  const serverRoom = serverRooms[uuid];
  if (!serverRoom) return null;

  const lobbyRoom: LobbyRoom = {
    title: serverRoom.title,
    curPeople: Object.keys(serverRoom.players).length,
    maxPeople: 8, // TODO: 방 슬롯 열고 닫는 거에 따라 maxPeople 설정
    hasPassword: !!serverRoom.password,
    hashtags: serverRoom.hashtags, // TODO: playlistId를 통해 hashtags 가져오기
    playlistName: serverRoom.playlistName, // TODO: playlistId를 통해 playlistName 가져오기
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
    hashtags: serverRoom.hashtags, // TODO: playListID를 통해 hashtags를 기져 오기
    players: serverRoom.players,
    skip: serverRoom.skip,
    status: serverRoom.status,
    timePerProblem: serverRoom.timePerProblem,
    title: serverRoom.title,
    isAllReady: Object.keys(serverRoom.players).every((socketId) => serverRoom.players[socketId].status !== 'prepare'),
  };

  return gameRoom;
};
