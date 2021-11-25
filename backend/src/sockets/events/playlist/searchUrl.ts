import { Socket } from 'socket.io';

import { SocketEvents } from '~/types/SocketEvents';
import { search as searchY } from '~/utils/crawler';

async function handleSearchUrl(this: Socket, search: string, done: (result: any[]) => void) {
  const result = await searchY(search);
  done(
    result.map((element) => {
      return {
        title: element.title,
        url: element.url,
        thumbnails: element.thumbnails.url.split('?')[0],
      };
    }),
  );
}

const onSearchUrl = (socket: Socket) => {
  socket.on(SocketEvents.SEARCH_URL, handleSearchUrl);
};

export default onSearchUrl;
