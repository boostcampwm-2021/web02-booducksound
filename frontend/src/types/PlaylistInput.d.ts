import { Music } from './Music';

export type PlaylistInput = {
  playlistName: string;
  description: string;
  hashTag: string;
  hashTags: string[];
  musics: Music[];
};
