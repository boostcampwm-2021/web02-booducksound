import { combineReducers } from 'redux';

import room from './room';
import socket from './socket';

const rootReducer = combineReducers({
  socket,
  room,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
