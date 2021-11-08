import { useEffect } from 'react';

import useSocket from '@hooks/useSocket';

const useSocketOn = (event: string, callback: (data: any) => void) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [socket]);
};

export default useSocketOn;
