import { Playlist } from '~/types/Playlist';
import API from '~/utils/API';

import { BACKEND_URL } from '../constants';

export const selectPlaylist = async (_id: string) => {
  const res = await API('GET')(`${BACKEND_URL}/playlist?_id=${_id}`)();
  return await res.json();
};

export const createPlaylist = async (playlistInfo: Playlist) => {
  const res = await API('POST')(`${BACKEND_URL}/playlist`)({ body: JSON.stringify(playlistInfo) });
  return await res.json();
};

export const updatePlaylist = async (_id: string, playlistInfo: Playlist) => {
  const res = await API('PUT')(`${BACKEND_URL}/playlist`)({ body: JSON.stringify({ _id, data: playlistInfo }) });
  return await res.json();
};

export const deletePlaylist = async (_id: string) => {
  const res = await API('DELETE')(`${BACKEND_URL}/playlist?_id=${_id}`)();
  return await res.json();
};
