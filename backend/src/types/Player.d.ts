export type Player = {
  nickname: string;
  color: string;
  status: 'king' | 'ready' | 'prepare';
  skip: boolean;
  answer: boolean;
  score: number;
};
