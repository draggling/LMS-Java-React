import {
	READ_COPIES_SUCCESSFUL,
	READ_COPIES_PENDING,
    READ_COPIES_FAILURE,
    READ_NON_COPIES_SUCCESSFUL,
    READ_NON_COPIES_PENDING,
    READ_NON_COPIES_FAILURE,
	CREATE_COPIES_REQUEST,
	CREATE_COPIES_FAILURE,
	CREATE_COPIES_SUCCESSFUL,
	LIBRARIAN_SELECT_BRANCH,
	LIBRARIAN_SWITCH,
} from '../constants/actionTypes';

export default function copiesReducer(state = {}, action) {
	switch (action.type) {
		case READ_COPIES_PENDING:
			return {
				...state,
				requestInfo: { ...state.requestInfo, readCopiesPending: true },
			};
		case READ_COPIES_SUCCESSFUL:
			return {
				...state,
				bookCopies: action.data,
				requestInfo: {
					...state.requestInfo,
					readCopiesSuccessful: true,
					readCopiesPending: false,
					inLibrary: true,
				}
			};
		case READ_COPIES_FAILURE:
			return {
				...state,
				requestInfo: {
					...state.requestInfo,
					readFailed: true,
					readPending: false,
				},
			};
        case READ_NON_COPIES_PENDING:
			return {
				...state,
				requestInfo: { ...state.requestInfo, readNonCopiesPending: true },
            };
        case READ_NON_COPIES_SUCCESSFUL:
            return {
                ...state,
                bookNonCopies: action.data,
                requestInfo: {
                    ...state.requestInfo,
					readNonCopiesSuccessful: true,
					readNonCopiesPending: false,
					inLibrary: true,
                },
            };
        case READ_NON_COPIES_FAILURE:
            return {
                ...state,
                requestInfo: {
                    ...state.requestInfo,
                    readFailed: true,
                    readPending: false,
                },
            };
		case CREATE_COPIES_REQUEST:
			return {
				...state,
				copiesData: {
					...state.copiesData,
				},
				requestInfo: {
					...state.requestInfo,
					creating: true,
					createFailed: false,
					createSuccess: false,
				},
			};
		case CREATE_COPIES_FAILURE:
			return {
				...state,
				copiesData: {
					...state.copiesData,
				},
				requestInfo: {
					...state.requestInfo,
					createFailed: true,
					creating: false,
				},
			};
		case CREATE_COPIES_SUCCESSFUL: {
			let temp = JSON.parse(JSON.stringify(state.bookCopies));
			if(action.data.numberOfCopies === 0) {
				temp = temp.filter((b1) => {
					console.log("b1 = ");
					console.log(b1);
					if(b1.book.bookId === action.data.book.bookId) {
						console.log("WOW");
						return false;
					}
					return b1.book.bookId !== action.data.book.bookId;
				});
				console.log("temp after filter:");
				console.log(temp);
				return {
					...state,
					bookCopies: temp,
					requestInfo: {
						...state.requestInfo,
						readCopiesSuccessful: true,
						creating: false,
					},
				}
			} else {
				temp = temp.map((b2) => {
					console.log("b2 = ");
					console.log(b2);
					if(b2.book.bookId === action.data.book.bookId) {
						b2.numberOfCopies = action.data.numberOfCopies;
						return b2;
					} else {
						return b2;
					}
				});
				console.log("new copies");
				console.log(temp);
				return {
					...state,
					bookCopies: temp,
					requestInfo: {
						...state.requestInfo,
						readCopiesSuccessful: true,
						creating: false,
					},
				}
			}
		}

		case LIBRARIAN_SELECT_BRANCH: {
			return {
				...state,
				selectedBranch : action.data,
				requestInfo: {
					...state.requestInfo,
					booksPending: true,
					booksSuccessful: false,
					booksFailed: false,
				},
			};
		}
		case LIBRARIAN_SWITCH: {
			return {
				...state,
				requestInfo: {
					...state.requestInfo,
					inLibrary: !state.requestInfo.inLibrary,
				}
			};
		}
		default:
			return state;
	}
}
