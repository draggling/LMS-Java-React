import axios from 'axios';

import {
	READ_AUTHORS_PENDING,
	READ_AUTHORS_FAILURE,
	READ_AUTHORS_SUCCESSFUL,
	DELETE_AUTHOR_REQUEST,
	DELETE_AUTHOR_FAILURE,
	DELETE_AUTHOR_SUCCESSFUL,
	UPDATE_AUTHOR_REQUEST,
	UPDATE_AUTHOR_FAILURE,
	UPDATE_AUTHOR_SUCCESSFUL,
	CREATE_AUTHOR_REQUEST,
	CREATE_AUTHOR_FAILURE,
	CREATE_AUTHOR_SUCCESSFUL,
} from '../constants/actionTypes';
import { ADMIN_PORT } from '../constants/connections';

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

export const deleteAuthor = (authorId) => {
	return (dispatch) => {
		dispatch(_deleteAuthorRequest());
		return axios
			.delete(ADMIN_PORT + 'deleteAuthor', {
				data: { authorId: authorId },
			})
			.then((res) => {
				dispatch(_deleteAuthorSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_deleteAuthorFailed(error));
			});
	};
};

export const updateAuthor = (authorId, authorName) => {
	return (dispatch) => {
		dispatch(_updateAuthorRequest());
		return axios
			.put(ADMIN_PORT + 'updateAuthor', {
				authorId: authorId,
				authorName: authorName,
			})
			.then((res) => {
				dispatch(_updateAuthorSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_updateAuthorFailed(error));
			});
	};
};

export const createAuthor = (authorName) => {
	return (dispatch) => {
		dispatch(_createAuthorRequest());
		return axios
			.post(ADMIN_PORT + 'addAuthor', {
				authorName: authorName,
			})
			.then((res) => {
				dispatch(_createAuthorSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_createAuthorFailed(error));
			});
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

const _deleteAuthorRequest = () => {
	return {
		type: DELETE_AUTHOR_REQUEST,
	};
};

const _deleteAuthorSuccess = (res) => {
	return {
		type: DELETE_AUTHOR_SUCCESSFUL,
		data: res.data,
		deletedId: res.data.authorId,
	};
};

const _deleteAuthorFailed = (error) => {
	return {
		type: DELETE_AUTHOR_FAILURE,
		error,
	};
};

const _updateAuthorRequest = () => {
	return {
		type: UPDATE_AUTHOR_REQUEST,
	};
};

const _updateAuthorSuccess = (res) => {
	return {
		type: UPDATE_AUTHOR_SUCCESSFUL,
		updatedAuthor: res.data,
	};
};

const _updateAuthorFailed = (error) => {
	return {
		type: UPDATE_AUTHOR_FAILURE,
		error,
	};
};

const _createAuthorRequest = () => {
	return {
		type: CREATE_AUTHOR_REQUEST,
	};
};

const _createAuthorSuccess = (res) => {
	return {
		type: CREATE_AUTHOR_SUCCESSFUL,
		createdAuthor: res.data,
	};
};

const _createAuthorFailed = (error) => {
	return {
		type: CREATE_AUTHOR_FAILURE,
		error,
	};
};
