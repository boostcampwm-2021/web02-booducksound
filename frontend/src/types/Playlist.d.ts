import { Music } from './Music';

export type Playlist = {
  _id?: string;
  playlistName: string;
  description: string;
  musics: Music[];
  hashTags: string[];
  userId: string;
};
