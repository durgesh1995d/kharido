import * as types from '../types';

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case types.UPDATE_CART:
      console.log('Reducer===>', action.payload, state);

      return {
        ...state,
        // cartItems: state.cartItems.map(match =>
        //   match.id === action.payload.id ? action.payload : match,
        // ),
        cartItems: action.payload,
      };
    case types.DELETE_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(match => match.id !== action.payload),
      };
    case types.VIEW_CART:
      return {
        ...state,
        cartItems: state?.cartItems,
      };
    case types.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
