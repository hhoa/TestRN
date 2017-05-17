import { combineReducers } from 'redux';
import Auth from './AuthReducer';
import Data from './ReadDataReducer';
import Select from './SelectionReducer';
import Content from './ContentReducer';

export default combineReducers({
  Auth,
  Data,
  Select,
  Content
});
