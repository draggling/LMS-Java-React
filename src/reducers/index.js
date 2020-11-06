import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import branchReducer from './branchReducer';

const rootReducer = combineReducers({
  bookReducer,
  branchReducer,
});

export default rootReducer;
