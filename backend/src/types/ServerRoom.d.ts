import { ReadStream } from 'fs';
import { PassThrough } from 'stream';

import { Player } from './Player';

export type ServerRoom = {
  status: 'playing' | 'waiting';
  players: { [socketId: string]: Player };
  title: string;
  playListId: string;
  password?: string | null;
  skip: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  timePerProblem: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;

  // 게임 진행 중(status === playing)에만 존재하는 데이터
  musics: { youtubeId: string; answers: string[]; hint: string }[];
  streams: PassThrough[];
  // streams: ReadStream[];
  curRound: number;
  maxRound: number;
  skipCount: number;
};
