import { Player } from './Player';

export type Players = {
  [socketId: string]: Player;
};
