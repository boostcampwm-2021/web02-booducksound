import { useEffect } from 'react';

import useSocket from '~/hooks/useSocket';

const useSocketOn = (event: string, callback: (...data: any) => void, deps?: any) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [socket, deps]);
};

export default useSocketOn;
