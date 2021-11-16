export type LobbyRoom = {
  status: 'playing' | 'waiting' | 'resting';
  hasPassword: boolean;
  title: string;
  playlistName: string;
  hashtags: string[];
  curPeople: number;
  maxPeople: number;
};
