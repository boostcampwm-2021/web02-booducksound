import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getUserInfo } from 'src/api/account';

import { UserState } from '~/reducers/user';
import { UserActions } from '~/types/Actions';

export const getUser = () => async (dispatch: ThunkDispatch<UserState, void, Action>) => {
  try {
    const userInfo = await getUserInfo();
    const { id, nickname, color, likes, myPlaylist } = userInfo;
    userInfo && dispatch({ type: UserActions.SET_USER, payload: { id, nickname, color, likes, myPlaylist } });
  } catch (err) {
    console.error(err);
  }
};
