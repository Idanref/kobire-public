import { combineReducers } from 'redux';
import workshop from './workshop';
import comment from './comment';

export default combineReducers({
  workshop,
  comment,
});
