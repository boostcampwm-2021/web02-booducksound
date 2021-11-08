import room from '@reducer/room';
import socket from '@reducer/socket';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  socket,
  room,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
