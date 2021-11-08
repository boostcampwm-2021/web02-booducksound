import { UserActions } from '~/types/Actions';

export type UserState = {
  id?: string;
  nickname: string;
  color?: string;
  likes?: any;
};

const initialState: UserState = {
  id: '',
  nickname: '',
  color: '',
  likes: [],
};

const userReducer = (state = initialState, action: { type: UserActions; payload: UserState }) => {
  const { type, payload } = action;

  switch (type) {
    case UserActions.SET_USER: {
      const { id, nickname, color, likes } = payload;
      return { ...state, id, nickname, color, likes };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
