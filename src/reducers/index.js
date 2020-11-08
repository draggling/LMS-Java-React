import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import branchReducer from './branchReducer';
import publisherReducer from './publisherReducer';

const rootReducer = combineReducers({
	bookReducer,
	branchReducer,
	publisherReducer,
});

export default rootReducer;
