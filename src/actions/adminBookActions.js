import axios from 'axios';

import {
	READ_BOOKS_PENDING,
	READ_BOOKS_FAILURE,
	READ_BOOKS_SUCCESSFUL,
	READ_PUBLISHERS_PENDING,
	READ_PUBLISHERS_FAILURE,
	READ_PUBLISHERS_SUCCESSFUL,
	READ_AUTHORS_PENDING,
	READ_AUTHORS_FAILURE,
	READ_AUTHORS_SUCCESSFUL,
	READ_GENRES_PENDING,
	READ_GENRES_FAILURE,
	READ_GENRES_SUCCESSFUL,
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
export const readPublishers = () => {
	return (dispatch) => {
		dispatch(_readPublisherStarted());
		return axios
			.get(ADMIN_PORT + 'getPublishers')
			.then((res) => {
				dispatch(_readPublisherSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_readPublisherFailed(error));
			});
	};
};

export const readAuthors = () => {
	return (dispatch) => {
		dispatch(_readAuthorStarted());
		return axios
			.get(ADMIN_PORT + 'getAuthors')
			.then((res) => {
				dispatch(_readAuthorSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_readAuthorFailed(error));
			});
	};
};

export const readGenres = () => {
	return (dispatch) => {
		dispatch(_readGenreStarted());
		return axios
			.get(ADMIN_PORT + 'getGenres')
			.then((res) => {
				dispatch(_readGenreSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_readGenreFailed(error));
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

export const updateBook = (bookId, title, publisher, authors, genres) => {
	return (dispatch) => {
		dispatch(_updateBookRequest());
		console.log("bookId:");
		console.log(bookId);
		console.log("book title:");
		console.log(title);
		console.log("publisher");
		console.log(publisher);
		console.log("authors");
		console.log(authors);
		console.log("genres");
		console.log(genres);
		return axios
			.put(ADMIN_PORT + 'updateBook', {
				bookId: bookId,
				title: title,
				publisher: publisher,
				authors: authors,
				genres: genres,
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

export const createBook = (title, publisher, authors, genres) => {
	return (dispatch) => {
		dispatch(_createBookRequest());
		return axios
			.post(ADMIN_PORT + 'addBook', {
				title: title,
				publisher: publisher,
				authors: authors,
				genres: genres,
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

const _readPublisherSuccess = (res) => {
	return {
		type: READ_PUBLISHERS_SUCCESSFUL,
		data: res.data,
	};
};

const _readPublisherFailed = (error) => {
	return {
		type: READ_PUBLISHERS_FAILURE,
		error,
	};
};

const _readPublisherStarted = () => {
	return {
		type: READ_PUBLISHERS_PENDING,
	};
};

const _readAuthorSuccess = (res) => {
	return {
		type: READ_AUTHORS_SUCCESSFUL,
		data: res.data,
	};
};

const _readAuthorFailed = (error) => {
	return {
		type: READ_AUTHORS_FAILURE,
		error,
	};
};

const _readAuthorStarted = () => {
	return {
		type: READ_AUTHORS_PENDING,
	};
};

const _readGenreSuccess = (res) => {
	return {
		type: READ_GENRES_SUCCESSFUL,
		data: res.data,
	};
};

const _readGenreFailed = (error) => {
	return {
		type: READ_GENRES_FAILURE,
		error,
	};
};

const _readGenreStarted = () => {
	return {
		type: READ_GENRES_PENDING,
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
