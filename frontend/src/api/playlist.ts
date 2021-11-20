import { Playlist } from '~/types/Playlist';
import API from '~/utils/API';

import { BACKEND_URL } from '../constants';

export const selectPlaylist = async (_id: string) => {
  const res = await API('GET')(`${BACKEND_URL}/playlist/${_id}`)();
  return res.json();
};

export const createPlaylist = async (playlistInfo: Playlist) => {
  const res = await API('POST')(`${BACKEND_URL}/playlist`)({ body: JSON.stringify(playlistInfo) });
  return res.json();
};

export const updatePlaylist = async (_id: string, playlistInfo: Playlist) => {
  const res = await API('PUT')(`${BACKEND_URL}/playlist`)({ body: JSON.stringify({ _id, data: playlistInfo }) });
  return res.json();
};

export const deletePlaylist = async (_id: string) => {
  const res = await API('DELETE')(`${BACKEND_URL}/playlist/${_id}`)();
  return res.json();
};

export const getPlaylists = async (option?: { q?: string; page?: number }) => {
  const params = new URLSearchParams();
  if (option?.q) params.append('q', option.q);
  if (option?.page) params.append('page', option.page.toString());

  const res = await API('GET')(`${BACKEND_URL}/playlist?${params.toString()}`)();
  return res.json();
};

export const updateLikeCount = (option: string) => async (_id: string) =>
  await API('PUT')(`${BACKEND_URL}/playlist/like`)({ body: JSON.stringify({ _id, mode: option }) });

export const incrementLikeCount = updateLikeCount('INCREMENT');
export const decrementLikeCount = updateLikeCount('DECREMENT');
