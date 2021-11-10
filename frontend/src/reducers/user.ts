import { UserActions } from '~/types/Actions';
import { Playlist } from '~/types/Playlist';

export type UserState = {
  id: string;
  nickname: string;
  color: string;
  likes: any;
  myPlaylist: Playlist[];
};

const initialState: UserState = {
  id: '',
  nickname: '',
  color: '',
  likes: [],
  myPlaylist: [],
};

const userReducer = (state = initialState, action: { type: UserActions; payload: UserState }) => {
  const { type, payload } = action;

  switch (type) {
    case UserActions.SET_USER: {
      const { id, nickname, color, likes, myPlaylist } = payload;
      return { ...state, id, nickname, color, likes, myPlaylist };
    }
    case UserActions.SET_COLOR: {
      const { color } = payload;
      return { ...state, color };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
