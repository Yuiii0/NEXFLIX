import { produce } from "immer";

const initialState = {
  profile: {
    id: null,
    name: null,
    nickname: null,
    location: null,
  },
};

//action.type정의
const ADD_USERID = "user/addUserId";
const UPDATE_NAME = "user/updateName";
const UPDATE_NICKNAME = "user/updateNickName";
const UPDATE_LOCATION = "user/updateLocation";

// action 생성자 함수 정의
export const addUserId = (payload) => ({
  type: ADD_USERID,
  payload,
});

export const updateNickName = (payload) => ({
  type: UPDATE_NICKNAME,
  payload,
});

export const updateName = (payload) => ({
  type: UPDATE_NAME,
  payload,
});

export const updateLocation = (payload) => ({
  type: UPDATE_LOCATION,
  payload,
});

export default function userReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_USERID:
        draft.profile.id = action.payload;
        break;
      case UPDATE_NAME:
        draft.profile.name = action.payload;
        break;
      case UPDATE_NICKNAME:
        draft.profile.nickname = action.payload;
        break;
      case UPDATE_LOCATION:
        draft.profile.location = action.payload;
        break;
      default:
        break;
    }
  });
}
