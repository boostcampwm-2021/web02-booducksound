export const headers = { 'Content-Type': 'application/json' };
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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
