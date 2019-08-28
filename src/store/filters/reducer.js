import * as actionTypes from "./actionTypes";

const initialState = {
  filters: null
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.filters } };
    default: {
      return state;
    }
  }
};

export default filtersReducer;
