import { Player } from './Player';

export type GameRoom = {
  status: 'playing' | 'waiting' | 'resting';
  players: { [socketId: string]: Player };
  playlistName: string;
  title: string;
  playlistId: string;
  hashtags: string[];
  hasPassword: boolean;
  curRound: number;
  maxRound: number;
  needAnswerRatio: 0.01 | 0.25 | 0.5 | 0.75 | 1;
  timePerProblem: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
  isAllReady: boolean;
};
