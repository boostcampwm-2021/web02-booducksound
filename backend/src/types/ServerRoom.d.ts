import { Player } from './Player';

export type ServerRoom = {
  status: 'playing' | 'waiting';
  players: { [socketId: string]: Player };
  title: string;
  playlistName: string;
  playlistId: string;
  password?: string | null;
  skip: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  timePerProblem: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
};

// 게임 진행 중(status === playing)에만 존재하는 데이터
export type PlayingServerRoom = ServerRoom & {
  musics: { youtubeId: string }[];
  curRound: number;
  maxRound: number;
  skipCount: number;
};
