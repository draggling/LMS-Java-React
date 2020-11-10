import { combineReducers } from 'redux';
import authorReducer from './authorReducer';
import bookReducer from './bookReducer';
import borrowerReducer from './borrowerReducer';
import branchReducer from './branchReducer';
import genreReducer from './genreReducer';
import loanReducer from './loanReducer';
import publisherReducer from './publisherReducer';

const rootReducer = combineReducers({
	authorReducer,
	bookReducer,
	borrowerReducer,
	branchReducer,
	genreReducer,
	loanReducer,
	publisherReducer,
});

export default rootReducer;
