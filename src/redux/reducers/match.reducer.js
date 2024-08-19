import * as types from '../types';

const initialState = {
  matches: [],
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_MATCH:
      return {
        ...state,
        matches: [...state.matches, action.payload],
      };
    case types.UPDATE_MATCH:
      return {
        ...state,
        matches: state.matches.map(match =>
          match.id === action.payload.id ? action.payload : match,
        ),
      };
    case types.DELETE_MATCH:
      return {
        ...state,
        matches: state.matches.filter(match => match.id !== action.payload),
      };
    case types.VIEW_MATCHES:
      return {
        ...state,
        matches: action.payload,
      };
    default:
      return state;
  }
};

export default matchReducer;
