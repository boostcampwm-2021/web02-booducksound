import { PassThrough } from 'stream';

import { Player } from './Player';

export type ServerRoom = {
  status: 'playing' | 'waiting' | 'resting';
  players: { [socketId: string]: Player };
  title: string;
  playlistName: string;
  playlistId: string;
  password?: string | null;
  skip: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  timePerProblem: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;

  musics: { url: string; info: string; answers: string[]; hint: string }[];
  streams: PassThrough[];
  curRound: number;
  maxRound: number;
  skipCount: number;
  timer: NodeJS.Timeout | null;
};
