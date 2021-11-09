import { GameRoom } from '../types/GameRoom';
import { LobbyRoom } from '../types/LobbyRoom';
import { ServerRoom } from '../types/ServerRoom';

export const serverRooms: { [uuid: string]: ServerRoom } = {};

export const getLobbyRoom = (uuid: string) => {
  const serverRoom = serverRooms[uuid];
  if (!serverRoom) return null;

  const lobbyRoom: LobbyRoom = {
    title: serverRoom.title,
    curPeople: serverRoom.players.length,
    maxPeople: 8, // TODO: 방 슬롯 열고 닫는 거에 따라 maxPeople 설정
    hasPassword: !!serverRoom.password,
    hashtags: ['해시태그1', '해시태그2'], // TODO: playlistId를 통해 hashtags 가져오기
    playlistName: '플레이리스트이름', // TODO: playlistId를 통해 playlistName 가져오기
    status: serverRoom.status,
  };

  return lobbyRoom;
};

export const getGameRoom = (uuid: string) => {
  const serverRoom = serverRooms[uuid];
  if (!serverRoom) return null;

  const gameRoom: GameRoom = {
    hasPassword: !!serverRoom.password,
    playListId: serverRoom.playListId,
    players: serverRoom.players,
    skip: serverRoom.skip,
    status: serverRoom.status,
    timePerProblem: serverRoom.timePerProblem,
    title: serverRoom.title,
  };

  return gameRoom;
};
