import * as types from "./actionTypes";

export function setFilters(filters) {
  return dispatch => {    
    dispatch({ type: types.SET_FILTERS, filters });
  };
}
