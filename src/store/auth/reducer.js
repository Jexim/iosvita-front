import * as actionTypes from "./actionTypes";

const initialState = {
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_TOKEN:
      return { ...state, token: action.token };
    default: {
      return state;
    }
  }
};

export default authReducer;
