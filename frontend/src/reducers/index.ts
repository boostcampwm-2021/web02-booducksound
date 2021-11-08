import { combineReducers } from 'redux';

import room from '~/reducers/room';
import socket from '~/reducers/socket';
import user from '~/reducers/user';

const rootReducer = combineReducers({
  socket,
  room,
  user,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
