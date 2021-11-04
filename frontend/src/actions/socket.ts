import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { io } from 'socket.io-client';

import { SocketState } from '../reducers/socket';
import { SocketActions } from '../types/actions';

export const connectSocket = () => (dispatch: ThunkDispatch<SocketState, void, Action>) => {
  try {
    const socket = io('http://localhost:5000');
    const socketId = socket.id;
    dispatch({ type: SocketActions.SET_SOCKET, payload: { socket, socketId } });
  } catch (error) {
    console.error(error);
  }
};
