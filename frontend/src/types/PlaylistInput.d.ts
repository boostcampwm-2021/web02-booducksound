import { Music } from './Music';

export type PlaylistInput = {
  playlistName: string;
  description: string;
  hashtag: string;
  hashtags: string[];
  musics: Music[];
};
