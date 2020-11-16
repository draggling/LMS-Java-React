import axios from 'axios';

import {
	READ_BOOKS_PENDING,
	READ_BOOKS_FAILURE,
	READ_BOOKS_SUCCESSFUL,
	DELETE_BOOK_REQUEST,
	DELETE_BOOK_FAILURE,
	DELETE_BOOK_SUCCESSFUL,
	UPDATE_BOOK_REQUEST,
	UPDATE_BOOK_FAILURE,
	UPDATE_BOOK_SUCCESSFUL,
	CREATE_BOOK_REQUEST,
	CREATE_BOOK_FAILURE,
	CREATE_BOOK_SUCCESSFUL,
} from '../constants/actionTypes';
import { ADMIN_PORT } from '../constants/connections';

export const readBooks = () => {
	return (dispatch) => {
		dispatch(_readBookStarted());
		return axios
			.get(ADMIN_PORT + 'getBooks')
			.then((res) => {
				dispatch(_readBookSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_readBookFailed(error));
			});
	};
};

export const deleteBook = (bookId) => {
	return (dispatch) => {
		dispatch(_deleteBookRequest());
		return axios
			.delete(ADMIN_PORT + 'deleteBook', {
				data: { bookId: bookId },
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

export const updateBook = (bookId, publisherId, title) => {
	return (dispatch) => {
		dispatch(_updateBookRequest());
		return axios
			.put(ADMIN_PORT + 'updateBook', {
				bookId: bookId,
                title: title,
                pubId: publisherId,
			})
			.then((res) => {
				dispatch(_updateBookSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_updateBookFailed(error));
			});
	};
};

export const createBook = (title, publisherId) => {
	return (dispatch) => {
		dispatch(_createBookRequest());
		return axios
			.post(ADMIN_PORT + 'addBook', {
                title: title,
                pubId: publisherId,
			})
			.then((res) => {
				dispatch(_createBookSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_createBookFailed(error));
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

const _updateBookRequest = () => {
	return {
		type: UPDATE_BOOK_REQUEST,
	};
};

const _updateBookSuccess = (res) => {
	return {
		type: UPDATE_BOOK_SUCCESSFUL,
		updatedBook: res.data,
	};
};

const _updateBookFailed = (error) => {
	return {
		type: UPDATE_BOOK_FAILURE,
		error,
	};
};

const _createBookRequest = () => {
	return {
		type: CREATE_BOOK_REQUEST,
	};
};

const _createBookSuccess = (res) => {
	return {
		type: CREATE_BOOK_SUCCESSFUL,
		createdBook: res.data,
	};
};

const _createBookFailed = (error) => {
	return {
		type: CREATE_BOOK_FAILURE,
		error,
	};
};
