import { BACKEND_URL, HEADERS as headers } from '~/constants/index';

const handleNonUserColor = async (color: string) => {
  console.log(color);
  await fetch(`${BACKEND_URL}/user/`);
};

export const changeColor = async (id: string, color: string) => {
  const handleColor = async () =>
    await fetch(`${BACKEND_URL}/user/color`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({
        id,
        color,
      }),
    });
  id ? handleColor() : handleNonUserColor(color);
};

export const getMyPlaylist = async (_id: Array<string>) => {
  const res = await fetch(`${BACKEND_URL}/user/playlist?_id=${JSON.stringify(_id)}`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
  return res.json();
};

export const deleteLikes = async (id: string, _id: string) => {
  await fetch(`${BACKEND_URL}/user/likes`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      id,
      _id,
    }),
  });
  return true;
};
