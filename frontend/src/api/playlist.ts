import { Playlist } from '~/types/Playlist';

import { BACKEND_URL, HEADERS } from '../constants';

export const selectPlaylist = async (_id: string) => {
  const res = await fetch(`${BACKEND_URL}/playlist?_id=${_id}`, {
    method: 'GET',
    headers: HEADERS,
  });
  return await res.json();
};
export const createPlaylist = async (playlistInfo: Playlist) => {
  const res = await fetch(`${BACKEND_URL}/playlist`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(playlistInfo),
  });
  return await res.json();
};
export const updatePlaylist = async (_id: string, playlistInfo: Playlist) => {
  const res = await fetch(`${BACKEND_URL}/playlist`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify({ _id, data: playlistInfo }),
  });
  return await res.json();
};
export const deletePlaylist = async (_id: string) => {
  const res = await fetch(`${BACKEND_URL}/playlist?_id=${_id}`, {
    method: 'DELETE',
    headers: HEADERS,
  });
  return await res.json();
};
