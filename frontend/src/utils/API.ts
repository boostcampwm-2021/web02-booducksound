import { HEADERS as headers } from '~/constants/index';

type FetchOption = {
  body?: ReadableStream | Blob | FormData | URLSearchParams | string;
  headers?: Headers;
  credentials?: 'include' | 'omit' | 'same-origin';
  keepalive?: boolean;
  referrer?: string;
};

const API = (method: 'GET' | 'POST' | 'DELETE' | 'PUT') => (url: string) => (params?: FetchOption) => {
  return fetch(url, { method, headers, ...params, credentials: 'include' });
};

export default API;
