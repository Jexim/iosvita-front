import * as actionTypes from "./actionTypes";

const initialState = {
  selectedProducts: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_PRODUCTS:
      return { ...state, selectedProducts: action.selectedProducts };
    case actionTypes.ADD_SELECTED_PRODUCT:
      return { ...state, selectedProducts: [...state.selectedProducts, action.selectedProduct] };
    default: {
      return state;
    }
  }
};

export default authReducer;
