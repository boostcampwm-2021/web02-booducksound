import { LobbyRoom } from '~/types/LobbyRoom';
import serverRooms from '~/variables/serverRooms';

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

export default getLobbyRoom;
