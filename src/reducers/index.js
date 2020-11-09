import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import borrowerReducer from './borrowerReducer';
import branchReducer from './branchReducer';
import publisherReducer from './publisherReducer';

const rootReducer = combineReducers({
	bookReducer,
	borrowerReducer,
	branchReducer,
	publisherReducer,
});

export default rootReducer;
