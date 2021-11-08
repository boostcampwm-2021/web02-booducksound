import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { io } from 'socket.io-client';

import { SocketState } from '../reducers/socket';
import { SocketActions } from '../types/Actions';

export const connectSocket = () => (dispatch: ThunkDispatch<SocketState, void, Action>) => {
  try {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URI as string);
    const socketId = socket.id;
    dispatch({ type: SocketActions.SET_SOCKET, payload: { socket, socketId } });
  } catch (error) {
    console.error(error);
  }
};
