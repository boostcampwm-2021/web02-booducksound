import { Player } from './Player';

export type GameRoom = {
  status: 'playing' | 'waiting' | 'resting';
  players: { [socketId: string]: Player };
  playlistName: string;
  title: string;
  playlistId: string;
  hashtags: string[];
  hasPassword: boolean;
  skip: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  timePerProblem: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
  isAllReady: boolean;
};
