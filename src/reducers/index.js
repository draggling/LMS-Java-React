import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import borrowerReducer from './borrowerReducer';
import branchReducer from './branchReducer';
import publisherReducer from './publisherReducer';
import genreReducer from './genreReducer';
import loanReducer from './loanReducer';
import authorReducer from './authorReducer';

const rootReducer = combineReducers({
	authorReducer,
	bookReducer,
	borrowerReducer,
	branchReducer,
	publisherReducer,
	genreReducer,
	loanReducer,
});

export default rootReducer;
