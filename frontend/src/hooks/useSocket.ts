import { useEffect } from 'react';

import { connectSocket } from '@actions/socket';
import { RootState } from '@reducer/index';
import { useSelector, useDispatch } from 'react-redux';

const useSocket = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((state: RootState) => state.socket);

  useEffect(() => {
    if (!socket) {
      dispatch(connectSocket());
    }
  }, [socket]);

  return socket;
};

export default useSocket;
