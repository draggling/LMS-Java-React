import axios from 'axios';

import {
	READ_BORROWERS_PENDING,
	READ_BORROWERS_FAILURE,
	READ_BORROWERS_SUCCESSFUL,
	DELETE_BORROWER_REQUEST,
	DELETE_BORROWER_FAILURE,
	DELETE_BORROWER_SUCCESSFUL,
	UPDATE_BORROWER_REQUEST,
	UPDATE_BORROWER_FAILURE,
	UPDATE_BORROWER_SUCCESSFUL,
	CREATE_BORROWER_REQUEST,
	CREATE_BORROWER_FAILURE,
	CREATE_BORROWER_SUCCESSFUL,
} from '../constants/actionTypes';
import { ADMIN_PORT } from '../constants/connections';

export const readBorrowers = () => {
	return (dispatch) => {
		dispatch(_readBorrowerStarted());
		return axios
			.get(ADMIN_PORT + 'getBorrowers')
			.then((res) => {
				dispatch(_readBorrowerSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_readBorrowerFailed(error));
			});
	};
};

export const deleteBorrower = (borrowerCardNo) => {
	return (dispatch) => {
		dispatch(_deleteBorrowerRequest());
		return axios
			.delete(ADMIN_PORT + 'deleteBorrower', {
				data: { borrowerCardNo: borrowerCardNo },
			})
			.then((res) => {
				dispatch(_deleteBorrowerSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_deleteBorrowerFailed(error));
			});
	};
};

export const updateBorrower = (borrowerCardNo, borrowerName, borrowerAddress, borrowerPhone) => {
	return (dispatch) => {
		dispatch(_updateBorrowerRequest());
		return axios
			.put(ADMIN_PORT + 'updateBorrower', {
				borrowerCardNo: borrowerCardNo,
				borrowerName: borrowerName,
				borrowerAddress: borrowerAddress,
				borrowerPhone: borrowerPhone,
			})
			.then((res) => {
				dispatch(_updateBorrowerSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_updateBorrowerFailed(error));
			});
	};
};

export const createBorrower = (borrowerName, borrowerAddress, borrowerPhone) => {
	return (dispatch) => {
		dispatch(_createBorrowerRequest());
		return axios
			.post(ADMIN_PORT + 'addBorrower', {
				borrowerName: borrowerName,
				borrowerAddress: borrowerAddress,
				borrowerPhone: borrowerPhone,
			})
			.then((res) => {
				dispatch(_createBorrowerSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_createBorrowerFailed(error));
			});
	};
};

const _readBorrowerSuccess = (res) => {
	return {
		type: READ_BORROWERS_SUCCESSFUL,
		data: res.data,
	};
};

const _readBorrowerFailed = (error) => {
	return {
		type: READ_BORROWERS_FAILURE,
		error,
	};
};

const _readBorrowerStarted = () => {
	return {
		type: READ_BORROWERS_PENDING,
	};
};

const _deleteBorrowerRequest = () => {
	return {
		type: DELETE_BORROWER_REQUEST,
	};
};

const _deleteBorrowerSuccess = (res) => {
	return {
		type: DELETE_BORROWER_SUCCESSFUL,
		data: res.data,
		deletedId: res.data.borrowerCardNo,
	};
};

const _deleteBorrowerFailed = (error) => {
	return {
		type: DELETE_BORROWER_FAILURE,
		error,
	};
};

const _updateBorrowerRequest = () => {
	return {
		type: UPDATE_BORROWER_REQUEST,
	};
};

const _updateBorrowerSuccess = (res) => {
	return {
		type: UPDATE_BORROWER_SUCCESSFUL,
		updatedBorrower: res.data,
	};
};

const _updateBorrowerFailed = (error) => {
	return {
		type: UPDATE_BORROWER_FAILURE,
		error,
	};
};

const _createBorrowerRequest = () => {
	return {
		type: CREATE_BORROWER_REQUEST,
	};
};

const _createBorrowerSuccess = (res) => {
	return {
		type: CREATE_BORROWER_SUCCESSFUL,
		createdBorrower: res.data,
	};
};

const _createBorrowerFailed = (error) => {
	return {
		type: CREATE_BORROWER_FAILURE,
		error,
	};
};
