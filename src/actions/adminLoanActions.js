import axios from 'axios';

import {
	READ_LOANS_PENDING,
	READ_LOANS_FAILURE,
	READ_LOANS_SUCCESSFUL,
	EXTEND_LOAN_REQUEST,
	EXTEND_LOAN_FAILURE,
	EXTEND_LOAN_SUCCESSFUL,
} from '../constants/actionTypes';
import { ADMIN_PORT } from '../constants/connections';

export const readLoans = () => {
	return (dispatch) => {
		dispatch(_readLoanStarted());
		return axios
			.get(ADMIN_PORT + 'getActiveBookLoans')
			.then((res) => {
				dispatch(_readLoanSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_readLoanFailed(error));
			});
	};
};

export const extendLoan = (key, newDueDate) => {
	return (dispatch) => {
		dispatch(_extendLoanRequest());
		return axios
			.put(ADMIN_PORT + 'extendLoan', {
				loan: key,
				daysToExtend: newDueDate,
			})
			.then((res) => {
				dispatch(_extendLoanSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_extendLoanFailed(error));
			});
	};
};

const _readLoanSuccess = (res) => {
	return {
		type: READ_LOANS_SUCCESSFUL,
		data: res.data,
	};
};

const _readLoanFailed = (error) => {
	return {
		type: READ_LOANS_FAILURE,
		error,
	};
};

const _readLoanStarted = () => {
	return {
		type: READ_LOANS_PENDING,
	};
};

const _extendLoanRequest = () => {
	return {
		type: EXTEND_LOAN_REQUEST,
	};
};

const _extendLoanSuccess = (res) => {
	return {
		type: EXTEND_LOAN_SUCCESSFUL,
		extendLoan: res.data,
	};
};

const _extendLoanFailed = (error) => {
	return {
		type: EXTEND_LOAN_FAILURE,
		error,
	};
};
