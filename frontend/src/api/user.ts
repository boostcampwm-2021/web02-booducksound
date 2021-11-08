import { BACKEND_URL, HEADERS as headers } from '~/constants/index';

export const changeColor = async (id: string, color: string) => {
  return await fetch(`${BACKEND_URL}/changeColor`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      id,
      color,
    }),
  });
};
