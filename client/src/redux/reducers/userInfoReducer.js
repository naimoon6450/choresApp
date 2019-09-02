// this is just a place holder
const { GOT_USER_INFO } = require('./../creators');

const initialState = {
  name: '',
  pictureUrl: '',
  isSignedIn: false,
};

export default userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER_INFO: {
      return {
        ...state,
        name: action.name,
        pictureUrl: action.pictureUrl,
        isSignedIn: action.isSignedIn,
      };
    }
    default:
      return state;
  }
};
