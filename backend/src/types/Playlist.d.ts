import { Music } from './Music';

export type Playlist = {
  playlistName: string;
  musics: Music[];
  hashTags: string[];
  userId: string;
};
