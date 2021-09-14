import {combineReducers} from 'redux';
import authReducers from './auth.js';
import todoReducers from './todo.js';

export default combineReducers({
  auth: authReducers,
  todo: todoReducers,
});
