import { combineReducers } from 'redux';

import room from '~/reducers/room';
import socket from '~/reducers/socket';

const rootReducer = combineReducers({
  socket,
  room,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
