import { Music } from './Music';

export type Playlist = {
  _id?: string;
  playlistName: string;
  description: string;
  musics: Music[];
  hashtags: string[];
  userId: string;
  likeCount: Number;
  playCount: Number;
};
