export interface Room {
  status: 'playing' | 'prepare';
  hasPassword: boolean;
  title: string;
  playlistName: string;
  hashtags: string[];
  curPeople: number;
  maxPeople: number;
}
