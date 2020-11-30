import {
	READ_BOOKS_SUCCESSFUL,
	READ_BOOKS_PENDING,
	READ_BOOKS_FAILURE,
	READ_PUBLISHERS_SUCCESSFUL,
	READ_PUBLISHERS_PENDING,
	READ_PUBLISHERS_FAILURE,
	READ_AUTHORS_SUCCESSFUL,
	READ_AUTHORS_PENDING,
	READ_AUTHORS_FAILURE,
	READ_GENRES_SUCCESSFUL,
	READ_GENRES_PENDING,
	READ_GENRES_FAILURE,
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

export default function bookReducer(state = {}, action) {
	switch (action.type) {
		case READ_BOOKS_PENDING:
			return {
				...state,
				requestInfo: { ...state.requestInfo, readPending: true,
				readPublisherPending: true, readAuthorPending: true, readGenrePending: true},
			};
		case READ_BOOKS_FAILURE:
			return {
				...state,
				requestInfo: {
					...state.requestInfo,
					readFailed: true,
					readPending: false,
				},
			};
		case READ_BOOKS_SUCCESSFUL:
			return {
				...state,
				bookData: {
					books: action.data,
				},
				requestInfo: {
					...state.requestInfo,
					readFailed: false,
					readSuccessful: true,
					readPending: false,
				},
			};
		case READ_PUBLISHERS_PENDING:
			return {
				...state,
				requestInfo: { ...state.requestInfo, readPending: true },
			};
		case READ_PUBLISHERS_FAILURE:
			return {
				...state,
				requestInfo: {
					...state.requestInfo,
					readPublisherFailed: true,
					readPublisherPending: false,
				},
			};
		case READ_PUBLISHERS_SUCCESSFUL:
			return {
				...state,
				publisherData: action.data,
				requestInfo: {
					...state.requestInfo,
					readPublisherFailed: false,
					readPublisherSuccessful: true,
					readPublisherPending: false,
				},
			};	
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
					readAuthorFailed: true,
					readAuthorPending: false,
				},
			};
		case READ_AUTHORS_SUCCESSFUL:
			return {
				...state,
				authorData: action.data,
				requestInfo: {
					...state.requestInfo,
					readAuthorFailed: false,
					readAuthorSuccessful: true,
					readAuthorPending: false,
				},
			};
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
					readGenreFailed: true,
					readGenrePending: false,
				},
			};
		case READ_GENRES_SUCCESSFUL:
			return {
				...state,
				genreData: action.data,
				requestInfo: {
					...state.requestInfo,
					readGenreFailed: false,
					readGenreSuccessful: true,
					readGenrePending: false,
				},
			};
		case DELETE_BOOK_REQUEST:
			return {
				...state,
				bookData: {
					...state.bookData,
				},
				requestInfo: {
					...state.requestInfo,
					deleting: true,
					deleteFailed: false,
					deleteSuccess: false,
				},
			};
		case DELETE_BOOK_FAILURE:
			return {
				...state,
				bookData: {
					...state.bookData,
				},
				requestInfo: {
					...state.requestInfo,
					deleteFailed: true,
					deleting: false,
				},
			};
		case DELETE_BOOK_SUCCESSFUL: {
			console.log("delete_book_successful");
			console.log(action);
			const newBooks = state.bookData.books.filter((book) => {
				return book.bookId != action.deletedId;
			});
			return {
				...state,
				bookData: {
					...state.bookData,
					books: newBooks,
				},
				requestInfo: {
					...state.requestInfo,
					deleteSuccess: true,
					deleting: false,
				},
			};
		}
		case UPDATE_BOOK_REQUEST:
			return {
				...state,
				bookData: {
					...state.bookData,
				},
				requestInfo: {
					...state.requestInfo,
					updating: true,
					updateFailed: false,
					updateSuccess: false,
				},
			};
		case UPDATE_BOOK_FAILURE:
			return {
				...state,
				bookData: {
					...state.bookData,
				},
				requestInfo: {
					...state.requestInfo,
					updateFailed: true,
					updating: false,
				},
			};
		case UPDATE_BOOK_SUCCESSFUL: {
			if (state.bookData.readPending) {
				/* Not needed if we continue to use toggle instead of handle refresh*/
				return {
					...state,
					bookData: {
						...state.bookData,
					},
					requestInfo: {
						...state.requestInfo,
						//updatedSuccess: true,
						//updating: false,
					},
				};
			} else {
				let updatedBooks = state.bookData.books.map((book) =>
					action.updatedBook.bookId === book.bookId
						? action.updatedBook
						: book
				);
				return {
					...state,
					bookData: {
						...state.bookData,
						books: updatedBooks,
					},
					requestInfo: {
						...state.requestInfo,
						updateSuccess: true,
						updating: false,
					},
				};
			}
		}
		case CREATE_BOOK_REQUEST:
			return {
				...state,
				bookData: {
					...state.bookData,
				},
				requestInfo: {
					...state.requestInfo,
					creating: true,
					createFailed: false,
					createSuccess: false,
				},
			};
		case CREATE_BOOK_FAILURE:
			return {
				...state,
				bookData: {
					...state.bookData,
				},
				requestInfo: {
					...state.requestInfo,
					createFailed: true,
					creating: false,
				},
			};
		case CREATE_BOOK_SUCCESSFUL: {
			let updatedBookArray = [
				...state.bookData.books,
				action.createdBook,
			];
			return {
				...state,
				bookData: {
					...state.bookData,
					books: updatedBookArray,
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
