import { combineReducers } from 'redux';

import socket from './socket';

const rootReducer = combineReducers({
  socket,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
