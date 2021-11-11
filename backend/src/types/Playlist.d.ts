import { Music } from './Music';

export type Playlist = {
  playlistName: string;
  musics: Music[];
  hashtags: string[];
  userId: string;
};
