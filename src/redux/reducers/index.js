import {combineReducers} from 'redux';
import matchReducer from './match.reducer';
import cartReducer from './cart.reducer';

const combinedReducer = combineReducers({
  match: matchReducer,
  cart: cartReducer,
});

const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

export default rootReducer;
