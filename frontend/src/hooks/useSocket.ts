import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { connectSocket } from '~/actions/socket';
import { RootState } from '~/reducers/index';

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
