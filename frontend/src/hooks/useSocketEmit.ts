import { useEffect } from 'react';

import useSocket from './useSocket';

const useSocketEmit = (event, data) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.emit(event, data);
  }, [socket]);
};

export default useSocketEmit;
