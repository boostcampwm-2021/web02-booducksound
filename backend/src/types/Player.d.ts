export type Player = {
  socketId: string;
  nickname: string;
  color: string;
  status: 'king' | 'ready' | 'prepare';
};
