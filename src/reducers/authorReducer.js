import {
	READ_AUTHORS_SUCCESSFUL,
	READ_AUTHORS_PENDING,
	READ_AUTHORS_FAILURE,
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

export default function authorReducer(state = {}, action) {
	switch (action.type) {
		case READ_AUTHORS_PENDING:
			return {
				...state,
				requestInfo: { ...state.requestInfo, readPending: true },
			};
		case READ_AUTHORS_FAILURE:
			return {
				...state,
				requestInfo: {
					...state.requestInfo,
					readFailed: true,
					readPending: false,
				},
			};
		case READ_AUTHORS_SUCCESSFUL:
			return {
				...state,
				authorData: {
					authors: action.data,
				},
				requestInfo: {
					...state.requestInfo,
					readFailed: false,
					readSuccessful: true,
					readPending: false,
				},
			};
		case DELETE_AUTHOR_REQUEST:
			return {
				...state,
				authorData: {
					...state.authorData,
				},
				requestInfo: {
					...state.requestInfo,
					deleting: true,
					deleteFailed: false,
					deleteSuccess: false,
				},
			};
		case DELETE_AUTHOR_FAILURE:
			return {
				...state,
				authorData: {
					...state.authorData,
				},
				requestInfo: {
					...state.requestInfo,
					deleteFailed: true,
					deleting: false,
				},
			};
		case DELETE_AUTHOR_SUCCESSFUL: {
			const newAuthors = state.authorData.authors.filter((author) => {
				return author.authorId != action.deletedId;
			});
			return {
				...state,
				authorData: {
					...state.authorData,
					authors: newAuthors,
				},
				requestInfo: {
					...state.requestInfo,
					deleteSuccess: true,
					deleting: false,
				},
			};
		}
		case UPDATE_AUTHOR_REQUEST:
			return {
				...state,
				authorData: {
					...state.authorData,
				},
				requestInfo: {
					...state.requestInfo,
					updating: true,
					updateFailed: false,
					updateSuccess: false,
				},
			};
		case UPDATE_AUTHOR_FAILURE:
			return {
				...state,
				authorData: {
					...state.authorData,
				},
				requestInfo: {
					...state.requestInfo,
					updateFailed: true,
					updating: false,
				},
			};
		case UPDATE_AUTHOR_SUCCESSFUL: {
			if (state.authorData.readPending) {
				/* Not needed if we continue to use toggle instead of handle refresh*/
				return {
					...state,
					authorData: {
						...state.authorData,
					},
					requestInfo: {
						...state.requestInfo,
						//updatedSuccess: true,
						//updating: false,
					},
				};
			} else {
				let updatedAuthors = state.authorData.authors.map((author) =>
					action.updatedAuthor.authorId === author.authorId
						? action.updatedAuthor
						: author
				);
				return {
					...state,
					authorData: {
						...state.authorData,
						authors: updatedAuthors,
					},
					requestInfo: {
						...state.requestInfo,
						updateSuccess: true,
						updating: false,
					},
				};
			}
		}
		case CREATE_AUTHOR_REQUEST:
			return {
				...state,
				authorData: {
					...state.authorData,
				},
				requestInfo: {
					...state.requestInfo,
					creating: true,
					createFailed: false,
					createSuccess: false,
				},
			};
		case CREATE_AUTHOR_FAILURE:
			return {
				...state,
				authorData: {
					...state.authorData,
				},
				requestInfo: {
					...state.requestInfo,
					createFailed: true,
					creating: false,
				},
			};
		case CREATE_AUTHOR_SUCCESSFUL: {
			let updatedAuthorArray = [
				...state.authorData.authors,
				action.createdAuthor,
			];
			return {
				...state,
				authorData: {
					...state.authorData,
					authors: updatedAuthorArray,
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