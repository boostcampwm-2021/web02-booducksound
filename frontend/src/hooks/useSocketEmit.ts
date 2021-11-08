import { useEffect } from 'react';

import useSocket from '~/hooks/useSocket';

const useSocketEmit = (event: string, ...argv: any) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.emit(event, ...argv);
  }, [socket]);
};

export default useSocketEmit;
