import { HEADERS as headers } from '../constants';

const { HeadersInit } = new Headers();

type FetchOption = {
  body?: BodyInit;
  headers?: Headers;
  credentials?: 'include' | 'omit' | 'same-origin';
  keepalive?: boolean;
  referrer?: string;
};

const API = (method: 'GET' | 'POST' | 'DELETE' | 'PUT') => (url: string) => (params?: FetchOption) => {
  return fetch(url, { method, headers, ...params, credentials: 'include' });
};

export default API;
