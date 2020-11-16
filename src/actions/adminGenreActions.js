import axios from 'axios';

import {
	READ_GENRES_PENDING,
	READ_GENRES_FAILURE,
	READ_GENRES_SUCCESSFUL,
	DELETE_GENRE_REQUEST,
	DELETE_GENRE_FAILURE,
	DELETE_GENRE_SUCCESSFUL,
	UPDATE_GENRE_REQUEST,
	UPDATE_GENRE_EXISTS,
	UPDATE_GENRE_FAILURE,
	UPDATE_GENRE_SUCCESSFUL,
	CREATE_GENRE_REQUEST,
	CREATE_GENRE_EXISTS,
	CREATE_GENRE_FAILURE,
	CREATE_GENRE_SUCCESSFUL,
} from '../constants/actionTypes';
import { ADMIN_PORT } from '../constants/connections';

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

export const deleteGenre = (genreId) => {
	return (dispatch) => {
		dispatch(_deleteGenreRequest());
		return axios
			.delete(ADMIN_PORT + 'deleteGenre', {
				data: { genreId: genreId },
			})
			.then((res) => {
				dispatch(_deleteGenreSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_deleteGenreFailed(error));
			});
	};
};

export const updateGenre = (genreId,genreName) => {
	return (dispatch) => {
		axios.get(ADMIN_PORT + 'findGenreName?genreName=' + genreName)
		.then ((res) => {
			if(res.data) {
				dispatch(_updateGenreExists());
			} else {
				dispatch(_updateGenreRequest());
				return axios
					.put(ADMIN_PORT + 'updateGenre', {
						genreId: genreId,
						genreName: genreName,
					})
					.then((res) => {
						dispatch(_updateGenreSuccess(res));
					})
					.catch((error) => {
						console.log(error);
						dispatch(_updateGenreFailed(error));
					});
			}
		})
		.catch((error) => {
			console.log(error);
			dispatch(_updateGenreFailed(error));
		});
	}
};

export const createGenre = (genreName) => {
	return (dispatch) => {
		axios.get(ADMIN_PORT + 'findGenreName?genreName=' + genreName)
		.then ((res) => {
			if(res.data) {
				dispatch(_createGenreExists());
			} else {
				dispatch(_createGenreRequest());
				return axios
				.post(ADMIN_PORT + 'addGenre', {
					genreName: genreName,
				})
				.then((res2) => {
					dispatch(_createGenreSuccess(res2));
				})
				.catch((error) => {
					console.log(error);
					dispatch(_createGenreFailed(error));
				})
				.catch((error) => {
					console.log(error);
					dispatch(_createGenreFailed(error));
				})
			}

		});
	}
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

const _deleteGenreRequest = () => {
	return {
		type: DELETE_GENRE_REQUEST,
	};
};

const _deleteGenreSuccess = (res) => {
	return {
		type: DELETE_GENRE_SUCCESSFUL,
		data: res.data,
		deletedId: res.data.genreId,
	};
};

const _deleteGenreFailed = (error) => {
	return {
		type: DELETE_GENRE_FAILURE,
		error,
	};
};

const _updateGenreRequest = () => {
	return {
		type: UPDATE_GENRE_REQUEST,
	};
};

const _updateGenreExists = () => {
	return {
		type: UPDATE_GENRE_EXISTS,
	};
};

const _updateGenreSuccess = (res) => {
	return {
		type: UPDATE_GENRE_SUCCESSFUL,
		updatedGenre: res.data,
	};
};

const _updateGenreFailed = (error) => {
	return {
		type: UPDATE_GENRE_FAILURE,
		error,
	};
};

const _createGenreRequest = () => {
	return {
		type: CREATE_GENRE_REQUEST,
	};
};

const _createGenreExists = () => {
	return {
		type: CREATE_GENRE_EXISTS,
	};
};

const _createGenreSuccess = (res) => {
	return {
		type: CREATE_GENRE_SUCCESSFUL,
		createdGenre: res.data,
	};
};

const _createGenreFailed = (error) => {
	return {
		type: CREATE_GENRE_FAILURE,
		error,
	};
};
