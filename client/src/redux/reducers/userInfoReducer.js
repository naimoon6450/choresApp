import { SET_BEARER_TOKEN, GET_USER_PROFILE } from '../creators';

// this is just a place holder
const { GET_FBUSER_INFO, GET_USER_CHORES } = require('./../creators');

const initialState = {
  name: '',
  pictureUrl: '',
  isSignedIn: false,
  firstName: '',
  surName: '',
  email: '',
  token: '',
  chores: {},
};

export default userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FBUSER_INFO: {
      return {
        ...state,
        name: action.name,
        pictureUrl: action.pictureUrl,
        isSignedIn: true,
      };
    }
    case SET_BEARER_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case GET_USER_PROFILE:
      return {
        ...state,
        id: action.user.id,
        email: action.user.email,
        firstName: action.user.firstName,
        surName: action.user.surName,
      };
    case GET_USER_CHORES: {
      return {
        ...state,
        chores: action.chores,
      };
    }
    default:
      return state;
  }
};
