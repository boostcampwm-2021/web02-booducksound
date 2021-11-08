import { Playlist } from '~/types/Playlist';

import { BACKEND_URL, HEADERS } from '../constants';

export const createPlaylist = async (playlistInfo: Playlist) => {
  const res = await fetch(`${BACKEND_URL}/playlist`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(playlistInfo),
  });
  return await res.json();
};
