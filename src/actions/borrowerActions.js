import axios from 'axios';

import {
	BORROWER_CHECKOUT_PENDING,
	BORROWER_CHECKOUT_FAILURE,
	BORROWER_CHECKOUT_SUCCESSFUL,
	BORROWER_DASHBOARD_READ_BOOKS_FAILED,
	BORROWER_DASHBOARD_READ_BOOKS_SUCCESSFUL,
	BORROWER_DASHBOARD_SELECT_BRANCH,
	BORROWER_LOGIN_PENDING,
	BORROWER_LOGIN_FAILURE,
	BORROWER_LOGIN_SUCCESSFUL,
	BORROWER_READ_ACTIVE_LOANS_FAILED,
	BORROWER_READ_ACTIVE_LOANS_SUCCESSFUL,
	BORROWER_READ_ALL_BRANCHES_FAILED,
	BORROWER_READ_ALL_BRANCHES_SUCCESSFUL,
	BORROWER_START_CHECKOUT,
	BORROWER_START_RETURN,
	BORROWER_RETURN_PENDING,
	BORROWER_RETURN_FAILURE,
	BORROWER_RETURN_SUCCESSFUL,
} from '../constants/actionTypes';
import { BORROWER_PORT } from '../constants/connections';

export const attemptLogin = (cardNo) => {
	return (dispatch) => {
		dispatch(_loginAttemptInitiated());
		return axios
			.get(BORROWER_PORT + 'borrower/getBorrowerById/' + cardNo)
			.then((response) => {
				dispatch(_loginAttemptSuccessful(response));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_loginAttemptFailed(error));
			});
	};
};

export const selectBranchForCheckout = (branch, cardNo) => {
	return (dispatch) => {
		dispatch(_selectBranch(branch));
		return axios
			.get(
				BORROWER_PORT +
					'borrower/getBooksAvailableFromBranchForBorrower/' +
					branch.branchId +
					'/' +
					cardNo
			)
			.then((response) => {
				dispatch(_readBooksAtBranchSuccess(response));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_readBooksAtBranchFailed(error));
			});
	};
};

export const processCheckout = (book, borrower, branch) => {
	return (dispatch) => {
		dispatch(_processCheckout(book));
		return axios
			.post(BORROWER_PORT + 'borrower/addNewBookLoan', {
				key: {
					bookId: book.bookId,
					branchId: branch.branchId,
					cardNo: borrower.borrowerCardNo,
				},
				book: book,
				branch: branch,
				borrower: borrower,
				dateOut: null,
				dueDate: null,
				dateIn: null,
			})
			.then((response) => {
				dispatch(_processCheckoutSuccess(response));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_processCheckoutFailed(error));
			});
	};
};

export const processReturn = (loanToReturn) => {
	return (dispatch) => {
		dispatch(_processReturn());
		return axios
			.put(BORROWER_PORT + 'borrower/bookLoanReturn', loanToReturn)
			.then((response) => {
				dispatch(_processReturnSuccess(response));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_processReturnFailed(error));
			});
	};
};

export const startCheckout = () => {
	return (dispatch) => {
		dispatch(_startCheckout());
		return axios
			.get(BORROWER_PORT + 'borrower/getLibraryBranchesWithAvailableBooks')
			.then((response) => {
				dispatch(_getAllBranchesSuccessful(response));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_getAllBranchesFailed(error));
			});
	};
};
export const startReturn = (borrowerCardNo) => {
	return (dispatch) => {
		dispatch(_startReturn());
		return axios
			.get(BORROWER_PORT + 'borrower/getActiveLoansForBorrower/' + borrowerCardNo)
			.then((response) => {
				dispatch(_getActiveLoansForBorrowerSuccessful(response));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_getActiveLoansForBorrowerFailed(error));
			});
	};
};

const _readBooksAtBranchSuccess = (res) => {
	return {
		type: BORROWER_DASHBOARD_READ_BOOKS_SUCCESSFUL,
		booksAvailable: res.data,
	};
};
const _readBooksAtBranchFailed = (error) => {
	return {
		type: BORROWER_DASHBOARD_READ_BOOKS_FAILED,
		error,
	};
};
const _loginAttemptInitiated = () => {
	return {
		type: BORROWER_LOGIN_PENDING,
	};
};
const _loginAttemptFailed = (error) => {
	return {
		type: BORROWER_LOGIN_FAILURE,
		error,
	};
};
const _loginAttemptSuccessful = (res) => {
	return {
		type: BORROWER_LOGIN_SUCCESSFUL,
		data: res.data,
	};
};

const _selectBranch = (branch) => {
	return {
		type: BORROWER_DASHBOARD_SELECT_BRANCH,
		selectedBranch: branch,
	};
};
const _startCheckout = () => {
	return {
		type: BORROWER_START_CHECKOUT,
	};
};
const _getActiveLoansForBorrowerSuccessful = (res) => {
	return {
		type: BORROWER_READ_ACTIVE_LOANS_SUCCESSFUL,
		loans: res.data,
	};
};
const _getActiveLoansForBorrowerFailed = (error) => {
	return {
		type: BORROWER_READ_ACTIVE_LOANS_FAILED,
		error,
	};
};
const _getAllBranchesFailed = (error) => {
	return {
		type: BORROWER_READ_ALL_BRANCHES_FAILED,
		error,
	};
};
const _getAllBranchesSuccessful = (res) => {
	return {
		type: BORROWER_READ_ALL_BRANCHES_SUCCESSFUL,
		data: res.data,
	};
};
const _processCheckout = (book) => {
	return {
		type: BORROWER_CHECKOUT_PENDING,
		selectedBook: book,
	};
};
const _processCheckoutFailed = (error) => {
	return {
		type: BORROWER_CHECKOUT_FAILURE,
		error,
	};
};
const _processCheckoutSuccess = (res) => {
	return {
		type: BORROWER_CHECKOUT_SUCCESSFUL,
		newLoan: res.data,
	};
};

const _processReturn = () => {
	return {
		type: BORROWER_RETURN_PENDING,
	};
};
const _processReturnFailed = (error) => {
	return {
		type: BORROWER_RETURN_FAILURE,
		error,
	};
};
const _processReturnSuccess = (res) => {
	return {
		type: BORROWER_RETURN_SUCCESSFUL,
		loan: res.data,
	};
};
const _startReturn = () => {
	return {
		type: BORROWER_START_RETURN,
	};
};
