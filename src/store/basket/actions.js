import * as types from "./actionTypes";

export function addSelectedProduct(product, count) {
  return dispatch => {
    dispatch({ type: types.ADD_SELECTED_PRODUCT, selectedProduct: { product, count } });
  };
}

export function clearAll() {
  return dispatch => {
    dispatch({ type: types.SET_SELECTED_PRODUCTS, selectedProducts: [] });
  };
}
