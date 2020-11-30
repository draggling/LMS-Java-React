import axios from 'axios';

import {
	READ_BOOKS_SUCCESSFUL,
	READ_BOOKS_FAILURE,
	READ_BOOKS_PENDING,
	DELETE_BOOK_REQUEST,
	DELETE_BOOK_SUCCESSFUL,
	DELETE_BOOK_FAILURE,
} from '../constants/actionTypes';

import { ADMIN_PORT } from '../constants/connections';

export const readBooks = () => {
	return (dispatch) => {
		dispatch(_readBookStarted());

		return axios
			.get(`http://www.mocky.io/v2/5daca80c30000092002987ad`)
			.then((res) => {
				dispatch(_readBookSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_readBookFailed(error));
			});
	};
};

export const deleteBook = (id) => {
	return (dispatch) => {
		dispatch(_deleteBookRequest());
		return axios
			.delete(ADMIN_PORT + 'deleteBook', {
				data: { bookId: id },
			})
			.then((res) => {
				dispatch(_deleteBookSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_deleteBookFailed(error));
			});
	};
};

const _readBookSuccess = (res) => {
	return {
		type: READ_BOOKS_SUCCESSFUL,
		data: res.data,
	};
};

const _readBookFailed = (error) => {
	return {
		type: READ_BOOKS_FAILURE,
		error,
	};
};

const _readBookStarted = () => {
	return {
		type: READ_BOOKS_PENDING,
	};
};

const _deleteBookRequest = () => {
	return {
		type: DELETE_BOOK_REQUEST,
	};
};

const _deleteBookSuccess = (res) => {
	return {
		type: DELETE_BOOK_SUCCESSFUL,
		data: res.data,
		deletedId: res.data.bookId,
	};
};

const _deleteBookFailed = (error) => {
	return {
		type: DELETE_BOOK_FAILURE,
		error,
	};
};
