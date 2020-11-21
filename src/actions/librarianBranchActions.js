import axios from 'axios';

import {
	READ_BRANCHES_PENDING,
	READ_BRANCHES_FAILURE,
	READ_BRANCHES_SUCCESSFUL,
	UPDATE_BRANCH_REQUEST,
	UPDATE_BRANCH_FAILURE,
	UPDATE_BRANCH_SUCCESSFUL,

	READ_COPIES_PENDING,
	READ_COPIES_SUCCESSFUL,
	READ_COPIES_FAILURE,
	CREATE_COPIES_REQUEST,
	CREATE_COPIES_SUCCESSFUL,
	CREATE_COPIES_FAILURE,
} from '../constants/actionTypes';
import { ADMIN_PORT } from '../constants/connections';

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

export const readCopies = () => {
	return (dispatch) => {
		dispatch(_readCopiesStarted());
		return axios.get(ADMIN_PORT + '/librarian/readBranchCopies', {
			params: {branchId: branchId}
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

export const createCopies = (branchId, bookId, numOfCopies) => {
	return (dispatch) => {
		dispatch(_createCopiesRequest());
		return axios
			.put(ADMIN_PORT + 'setBookCoopies', {
				branchId: branchId,
				bookId: bookId,
				numOfCopies: numOfCopies,
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
		type: READ_COPIES_PENDING
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

const _createCopiesRequest = () => {
	return {
		type: CREATE_COPIES_REQUEST,
	};
};

const _createCopiesSuccess = (res) => {
	return {
		type: CREATE_COPIES_SUCCESSFUL,
		createdCopies: res.data,
	};
};

const _createCopiesFailed = (error) => {
	return {
		type: CREATE_COPIES_FAILURE,
		error,
	};
};