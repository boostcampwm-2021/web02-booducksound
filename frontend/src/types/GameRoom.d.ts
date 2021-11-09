import { Player } from './Player';

export type GameRoom = {
  status: 'playing' | 'waiting';
  players: { [socketId: string]: Player };
  title: string;
  playListId: string;
  hasPassword: boolean;
  skip: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  timePerProblem: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
};
