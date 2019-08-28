import * as types from "./actionTypes";

export function setToken(token) {
  return dispatch => {    
    dispatch({ type: types.SET_USER_TOKEN, token });
  };
}

export function logout() {
  return dispatch => {    
    dispatch({ type: types.SET_USER_TOKEN, token: null });
  };
}