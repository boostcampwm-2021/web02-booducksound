import { BACKEND_URL, HEADERS as headers } from '~/constants/index';

export const changeColor = async (id: string, color: string) => {
  const handleColor = async () =>
    await fetch(`${BACKEND_URL}/user/changeColor`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({
        id,
        color,
      }),
    });
  id && handleColor();
};

export const getMyPlaylist = async (_id: Array<string>) => {
  const res = await fetch(`${BACKEND_URL}/user/getMyPlaylist?_id=${JSON.stringify(_id)}`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
  return res.json();
};
