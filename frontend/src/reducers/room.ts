import { RoomActions } from '../types/Actions';

export type RoomState = {
  uuid: string | null;
};

const initialState: RoomState = {
  uuid: null,
};

const roomReducer = (state = initialState, action: { type: RoomActions; payload: RoomState }) => {
  const { type, payload } = action;

  switch (type) {
    case RoomActions.SET_UUID: {
      const { uuid } = payload;
      return { ...state, uuid };
    }
    default: {
      return state;
    }
  }
};

export default roomReducer;
