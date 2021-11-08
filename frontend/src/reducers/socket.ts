import { Socket } from 'socket.io-client';

import { SocketActions } from '~/types/Actions';

export type SocketState = {
  socket: Socket | null;
  socketId: string | null;
};

const initialState: SocketState = {
  socket: null,
  socketId: null,
};

const socketReducer = (state = initialState, action: { type: SocketActions; payload: SocketState }) => {
  const { type, payload } = action;

  switch (type) {
    case SocketActions.SET_SOCKET: {
      const { socket, socketId } = payload;
      return { ...state, socket, socketId };
    }
    default: {
      return state;
    }
  }
};

export default socketReducer;
