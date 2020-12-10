import axios from 'axios';

import {
	LIBRARIAN_SELECT_BRANCH,
	READ_BRANCHES_PENDING,
	READ_BRANCHES_FAILURE,
	READ_BRANCHES_SUCCESSFUL,
	UPDATE_BRANCH_REQUEST,
	UPDATE_BRANCH_FAILURE,
	UPDATE_BRANCH_SUCCESSFUL,
	READ_COPIES_PENDING,
	READ_COPIES_SUCCESSFUL,
	READ_COPIES_FAILURE,
	READ_NON_COPIES_PENDING,
	READ_NON_COPIES_SUCCESSFUL,
	READ_NON_COPIES_FAILURE,
	CREATE_COPIES_REQUEST,
	CREATE_COPIES_SUCCESSFUL,
	CREATE_COPIES_FAILURE,
	CREATE_NON_COPIES_REQUEST,
	CREATE_NON_COPIES_SUCCESSFUL,
	CREATE_NON_COPIES_FAILURE,
	LIBRARIAN_SWITCH,
	BRANCH_SELECT,
} from '../constants/actionTypes';
import { ADMIN_PORT, LIBRARIAN_PORT } from '../constants/connections';

export const readBranches = () => {
	return (dispatch) => {
		dispatch(_readBranchStarted());
		return axios
			.get(ADMIN_PORT + 'getLibraryBranches')
			.then((res) => {
				dispatch(_readBranchSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_readBranchFailed(error));
			});
	};
};

export const updateBranch = (id, branchName, branchAddress) => {
	return (dispatch) => {
		dispatch(_updateBranchRequest());
		return axios
			.put(ADMIN_PORT + 'updateLibraryBranch', {
				branchId: id,
				branchName: branchName,
				branchAddress: branchAddress,
			})
			.then((res) => {
				dispatch(_updateBranchSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_updateBranchFailed(error));
			});
	};
};

export const readCopies = (branchId) => {
	return (dispatch) => {
		dispatch(_readCopiesStarted());
		return axios
			.get(LIBRARIAN_PORT + '/librarian/readBranchCopies', {
				params: { branchId: branchId },
			})
			.then((res) => {
				dispatch(_readCopiesSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_readCopiesFailed(error));
			});
	};
};

export const readNonCopies = (branchId) => {
	return (dispatch) => {
		dispatch(_readNonCopiesStarted());
		return axios
			.get(LIBRARIAN_PORT + 'librarian/readNonBranchCopies', {
				params: { branchId: branchId },
			})
			.then((res) => {
				dispatch(_readNonCopiesSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_readNonCopiesFailed(error));
			});
	};
};

export const setCopies = (bookId, branchId, numOfCopies) => {
	return (dispatch) => {
		dispatch(_createCopiesRequest());
		return axios
			.post(LIBRARIAN_PORT + 'librarian/setBookCopies', {
				book: { bookId: bookId },
				branch: { branchId: branchId },
				key: {
					bookId: bookId,
					branchId: branchId,
				},
				numberOfCopies: numOfCopies,
			})
			.then((res) => {
				dispatch(_createCopiesSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_createCopiesFailed(error));
			});
	};
};

export const setNonCopies = (bookId, branchId, numOfCopies) => {
	return (dispatch) => {
		dispatch(_createNonCopiesRequest());
		return axios
			.post(LIBRARIAN_PORT + 'librarian/setBookCopies', {
				book: { bookId: bookId },
				branch: { branchId: branchId },
				key: {
					bookId: bookId,
					branchId: branchId,
				},
				numberOfCopies: numOfCopies,
			})
			.then((res) => {
				dispatch(_createNonCopiesSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_createNonCopiesFailed(error));
			});
	};
};

export const selectBranch = (branch) => {
	return (dispatch) => {
		dispatch(_selectBranch(branch));
	};
};

export const Switch = () => {
	return (dispatch) => {
		dispatch(_SwitchRequest());
	};
};

/* resets branch information */
export const branchSelect = () => {
	return (dispatch) => dispatch(_branchSelect());
};

const _branchSelect = () => {
	return {
		type: BRANCH_SELECT,
	};
};
const _SwitchRequest = () => {
	return {
		type: LIBRARIAN_SWITCH,
	};
};

const _selectBranch = (branch) => {
	return {
		type: LIBRARIAN_SELECT_BRANCH,
		data: branch,
	};
};

const _readBranchSuccess = (res) => {
	return {
		type: READ_BRANCHES_SUCCESSFUL,
		data: res.data,
	};
};

const _readBranchFailed = (error) => {
	return {
		type: READ_BRANCHES_FAILURE,
		error,
	};
};

const _readBranchStarted = () => {
	return {
		type: READ_BRANCHES_PENDING,
	};
};

const _updateBranchRequest = () => {
	return {
		type: UPDATE_BRANCH_REQUEST,
	};
};

const _updateBranchSuccess = (res) => {
	return {
		type: UPDATE_BRANCH_SUCCESSFUL,
		updatedBranch: res.data,
	};
};

const _updateBranchFailed = (error) => {
	return {
		type: UPDATE_BRANCH_FAILURE,
		error,
	};
};

const _readCopiesStarted = () => {
	return {
		type: READ_COPIES_PENDING,
	};
};

const _readCopiesSuccess = (res) => {
	return {
		type: READ_COPIES_SUCCESSFUL,
		data: res.data,
	};
};

const _readCopiesFailed = (error) => {
	return {
		type: READ_COPIES_FAILURE,
		error,
	};
};

const _readNonCopiesStarted = () => {
	return {
		type: READ_NON_COPIES_PENDING,
	};
};

const _readNonCopiesSuccess = (res) => {
	return {
		type: READ_NON_COPIES_SUCCESSFUL,
		data: res.data,
	};
};

const _readNonCopiesFailed = (error) => {
	return {
		type: READ_NON_COPIES_FAILURE,
		error,
	};
};

const _createCopiesRequest = () => {
	return {
		type: CREATE_COPIES_REQUEST,
	};
};

const _createCopiesSuccess = (res) => {
	return {
		type: CREATE_COPIES_SUCCESSFUL,
		data: res.data,
	};
};

const _createCopiesFailed = (error) => {
	return {
		type: CREATE_COPIES_FAILURE,
		error,
	};
};

const _createNonCopiesRequest = () => {
	return {
		type: CREATE_NON_COPIES_REQUEST,
	};
};

const _createNonCopiesSuccess = (res) => {
	return {
		type: CREATE_NON_COPIES_SUCCESSFUL,
		data: res.data,
	};
};

const _createNonCopiesFailed = (error) => {
	return {
		type: CREATE_NON_COPIES_FAILURE,
		error,
	};
};
