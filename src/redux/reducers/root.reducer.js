import {combineReducers} from 'redux';
import matchReducer from './match.reducer';
import cartReducer from './cart.reducer';

const root = combineReducers({
  matchReducer,
  cartReducer,
});

export default root;
