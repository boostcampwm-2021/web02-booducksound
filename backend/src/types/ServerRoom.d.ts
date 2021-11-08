import { Player } from './Player';

export type ServerRoom = {
  status: 'playing' | 'waiting';
  players: Player[];
  title: string;
  playListId: string;
  password?: string | null;
  skip: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  timePerProblem: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
};
