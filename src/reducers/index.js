import { combineReducers } from 'redux';
import authorReducer from './authorReducer';
import bookReducer from './bookReducer';
import borrowerReducer from './borrowerReducer';
import branchReducer from './branchReducer';
import publisherReducer from './publisherReducer';
import genreReducer from './genreReducer';

const rootReducer = combineReducers({
	authorReducer,
	bookReducer,
	borrowerReducer,
	branchReducer,
	publisherReducer,
	genreReducer,
});

export default rootReducer;
