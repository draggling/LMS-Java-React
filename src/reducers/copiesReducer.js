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
	CREATE_NON_COPIES_REQUEST,
	CREATE_NON_COPIES_FAILURE,
	CREATE_NON_COPIES_SUCCESSFUL,
	LIBRARIAN_SELECT_BRANCH,
	LIBRARIAN_SWITCH,
	BRANCH_SELECT,
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
					readCopiesPending: false,
					inLibrary: true,
				}
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
				requestInfo: {
					...state.requestInfo,
					createFailed: true,
					creating: false,
				},
			};
			
		case CREATE_NON_COPIES_REQUEST:
			return {
				...state,
				requestInfo: {
					...state.requestInfo,
					creating: true,
					createFailed: false,
					createSuccess: false,
				},
			};
		case CREATE_NON_COPIES_FAILURE:
			return {
				...state,
				requestInfo: {
					...state.requestInfo,
					createFailed: true,
					creating: false,
				},
			};
		case CREATE_NON_COPIES_SUCCESSFUL: {
			let tempCopy = JSON.parse(JSON.stringify(state.bookCopies));	
			let tempNotCopy = JSON.parse(JSON.stringify(state.bookNonCopies));
			let tempBook = null;
			/* remove book from bookNonCopies */
			tempNotCopy = tempNotCopy.filter((b1) => {
				if(b1.bookId === action.data.book.bookId) {
					console.log("WHOA");
					tempBook = b1;
					return false;
				} {
					return true;
				}
			});
			/* add book to bookCopies */
			let newBookCopy = {
				book: tempBook,
				branch: {branchId : state.selectedBranch},
				key: {branchId : state.selectedBranch, bookId: tempBook.bookId},
				numberOfCopies: action.data.numberOfCopies,
			}
			tempCopy.unshift(newBookCopy);
            return {
                ...state,
				bookNonCopies: tempNotCopy,
				bookCopies: tempCopy,
                requestInfo: {
                    ...state.requestInfo,
					createNonCopiesSuccessful: true,
					creating: false,
                },
			};
		}
			//
		case CREATE_COPIES_SUCCESSFUL: {
			let tempCopy = JSON.parse(JSON.stringify(state.bookCopies));
			let tempNotCopy = JSON.parse(JSON.stringify(state.bookNonCopies))
			/* removes book from library copies view */
			if(action.data.numberOfCopies === 0) {
				tempCopy = tempCopy.filter((b1) => {
					if(b1.book.bookId === action.data.book.bookId) {
						tempNotCopy.unshift(b1.book);
						return false;
					}
					return b1.book.bookId !== action.data.book.bookId;
				});
				return {
					...state,
					bookCopies: tempCopy,
					bookNonCopies: tempNotCopy,
					requestInfo: {
						...state.requestInfo,
						createCopiesSuccessful: true,
						creating: false,
					},
				}
			} else {
				tempCopy = tempCopy.map((b2) => {
					if(b2.book.bookId === action.data.book.bookId) {
						b2.numberOfCopies = action.data.numberOfCopies;
						return b2;
					} else {
						return b2;
					}
				});
				return {
					...state,
					bookCopies: tempCopy,
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

		/* reset select branch */
		case BRANCH_SELECT: {
			return {
				...state,
				bookCopies: undefined,
				bookNonCopies: undefined,
				selectedBranch: undefined,
				requestInfo: {
					readSuccessful : true,
				},
				requestInfoCopies: undefined,
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
