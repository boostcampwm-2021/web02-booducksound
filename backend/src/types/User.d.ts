import { Playlist } from './Playlist';

export type User = {
  id: string;
  password: string;
  nickname: string;
  color: string;
  myPlaylist: Playlist[];
  likes: Playlist[];
  createAt: Date;
};
