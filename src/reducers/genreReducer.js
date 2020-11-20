import {
	READ_GENRES_SUCCESSFUL,
	READ_GENRES_PENDING,
	READ_GENRES_FAILURE,
	DELETE_GENRE_REQUEST,
	DELETE_GENRE_FAILURE,
	DELETE_GENRE_SUCCESSFUL,
	UPDATE_GENRE_REQUEST,
	UPDATE_GENRE_FAILURE,
	UPDATE_GENRE_SUCCESSFUL,
	CREATE_GENRE_REQUEST,
	CREATE_GENRE_FAILURE,
	CREATE_GENRE_SUCCESSFUL,
} from '../constants/actionTypes';

export default function genreReducer(state = {}, action) {
	switch (action.type) {
		case READ_GENRES_PENDING:
			return {
				...state,
				requestInfo: { ...state.requestInfo, readPending: true },
			};
		case READ_GENRES_FAILURE:
			return {
				...state,
				requestInfo: {
					...state.requestInfo,
					readFailed: true,
					readPending: false,
				},
			};
		case READ_GENRES_SUCCESSFUL:
			return {
				...state,
				genreData: {
					genres: action.data,
				},
				requestInfo: {
					...state.requestInfo,
					readFailed: false,
					readSuccessful: true,
					readPending: false,
				},
			};
		case DELETE_GENRE_REQUEST:
			return {
				...state,
				genreData: {
					...state.genreData,
				},
				requestInfo: {
					...state.requestInfo,
					deleting: true,
					deleteFailed: false,
					deleteSuccess: false,
				},
			};
		case DELETE_GENRE_FAILURE:
			return {
				...state,
				genreData: {
					...state.genreData,
				},
				requestInfo: {
					...state.requestInfo,
					deleteFailed: true,
					deleting: false,
				},
			};
		case DELETE_GENRE_SUCCESSFUL: {
			const newGenres = state.genreData.genres.filter(
				(genre) => {
					return genre.genreId != action.deletedId;
				}
			);
			return {
				...state,
				genreData: {
					...state.genreData,
					genres: newGenres,
				},
				requestInfo: {
					...state.requestInfo,
					deleteSuccess: true,
					deleting: false,
				},
			};
		}
		case UPDATE_GENRE_REQUEST:
			return {
				...state,
				genreData: {
					...state.genreData,
				},
				requestInfo: {
					...state.requestInfo,
					updating: true,
					updateFailed: false,
					updateSuccess: false,
				},
			};
		case UPDATE_GENRE_FAILURE:
			return {
				...state,
				genreData: {
					...state.genreData,
				},
				requestInfo: {
					...state.requestInfo,
					updateFailed: true,
					updating: false,
				},
			};
		case UPDATE_GENRE_SUCCESSFUL: {
			if (state.genreData.readPending) {
				/* Not needed if we continue to use toggle instead of handle refresh*/
				return {
					...state,
					genreData: {
						...state.genreData,
					},
					requestInfo: {
						...state.requestInfo,
						//updatedSuccess: true,
						//updating: false,
					},
				};
			} else {
				let updatedGenres = state.genreData.genres.map(
					(genre) =>
						action.updatedGenre.genreId ===
						genre.genreId
							? action.updatedGenre
							: genre
				);
				return {
					...state,
					genreData: {
						...state.genreData,
						genres: updatedGenres,
					},
					requestInfo: {
						...state.requestInfo,
						updateSuccess: true,
						updating: false,
					},
				};
			}
		}
		case CREATE_GENRE_REQUEST:
			return {
				...state,
				genreData: {
					...state.genreData,
				},
				requestInfo: {
					...state.requestInfo,
					creating: true,
					createFailed: false,
					createSuccess: false,
				},
			};
		case CREATE_GENRE_FAILURE:
			return {
				...state,
				genreData: {
					...state.genreData,
				},
				requestInfo: {
					...state.requestInfo,
					createFailed: true,
					creating: false,
				},
			};
		case CREATE_GENRE_SUCCESSFUL: {
			let updatedGenreArray = [
				...state.genreData.genres,
				action.createdGenre,
			];
			return {
				...state,
				genreData: {
					...state.genreData,
					genres: updatedGenreArray,
				},
				requestInfo: {
					...state.requestInfo,
					createSuccess: true,
					creating: false,
				},
			};
		}
		default:
			return state;
	}
}
