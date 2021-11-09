import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { getUserInfo } from '~/api/account';
import { getMyPlaylist } from '~/api/user';
import { UserState } from '~/reducers/user';
import { UserActions } from '~/types/Actions';

export const getUser = () => async (dispatch: ThunkDispatch<UserState, void, Action>) => {
  try {
    const userInfo = await getUserInfo();
    const { id, nickname, color, likes, myPlaylist } = userInfo;
    const likesList = await getMyPlaylist(likes);
    const myList = await getMyPlaylist(myPlaylist);

    userInfo &&
      dispatch({ type: UserActions.SET_USER, payload: { id, nickname, color, likes: likesList, myPlaylist: myList } });
  } catch (err) {
    console.error(err);
  }
};

export const setColor = (color: string) => (dispatch: ThunkDispatch<UserState, void, Action>) => {
  dispatch({ type: UserActions.SET_COLOR, payload: { color } });
};
