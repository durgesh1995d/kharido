import * as types from '../types';

export const addCart = data => {
  return dispatch => dispatch({type: types.ADD_CART, payload: data});
};

export const updateCart = data => {
  return dispatch => dispatch({type: types.UPDATE_CART, payload: data});
};

export const deleteCart = dataId => {
  return dispatch => dispatch({type: types.DELETE_CART, payload: dataId});
};

export const clearCart = () => {
  return dispatch =>
    dispatch({
      type: types.CLEAR_CART,
    });
};
