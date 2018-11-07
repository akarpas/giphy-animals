import { createStore, combineReducers } from 'redux';
import reducers from './reducers';

const combinedReducers = combineReducers(reducers);

export default function (initialState) {
  return createStore(combinedReducers, initialState);
}
