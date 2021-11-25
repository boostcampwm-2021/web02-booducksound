import { Player } from '~/types/Player';
import Youtubestream from '~/variables/YoutubeStream';

export type ServerRoom = {
  status: 'playing' | 'waiting' | 'resting';
  players: { [socketId: string]: Player };
  title: string;
  playlistName: string;
  playlistId: string;
  hashtags: string[];
  password?: string | null;
  needAnswerRatio: 0.01 | 0.25 | 0.5 | 0.75 | 1;
  timePerProblem: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;

  musics: { url: string; info: string; answers: string[]; hint: string }[];
  streams: Youtubestream[];
  curRound: number;
  maxRound: number;
  skipCount: number;
  answerCount: number;
  timer: NodeJS.Timeout | null;
  hintTimer: NodeJS.Timeout | null;
};
