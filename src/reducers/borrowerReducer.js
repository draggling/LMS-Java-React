import {
	READ_BORROWERS_SUCCESSFUL,
	READ_BORROWERS_PENDING,
	READ_BORROWERS_FAILURE,
	DELETE_BORROWER_REQUEST,
	DELETE_BORROWER_FAILURE,
	DELETE_BORROWER_SUCCESSFUL,
	UPDATE_BORROWER_REQUEST,
	UPDATE_BORROWER_FAILURE,
	UPDATE_BORROWER_SUCCESSFUL,
	CREATE_BORROWER_REQUEST,
	CREATE_BORROWER_FAILURE,
	CREATE_BORROWER_SUCCESSFUL,
} from '../constants/actionTypes';

export default function borrowerReducer(state = {}, action) {
	switch (action.type) {
		case READ_BORROWERS_PENDING:
			return {
				...state,
				requestInfo: { ...state.requestInfo, readPending: true },
			};
		case READ_BORROWERS_FAILURE:
			return {
				...state,
				requestInfo: {
					...state.requestInfo,
					readFailed: true,
					readPending: false,
				},
			};
		case READ_BORROWERS_SUCCESSFUL:
			return {
				...state,
				borrowerData: {
					borrowers: action.data,
				},
				requestInfo: {
					...state.requestInfo,
					readFailed: false,
					readSuccessful: true,
					readPending: false,
				},
			};
		case DELETE_BORROWER_REQUEST:
			return {
				...state,
				borrowerData: {
					...state.borrowerData,
				},
				requestInfo: {
					...state.requestInfo,
					deleting: true,
					deleteFailed: false,
					deleteSuccess: false,
				},
			};
		case DELETE_BORROWER_FAILURE:
			return {
				...state,
				borrowerData: {
					...state.borrowerData,
				},
				requestInfo: {
					...state.requestInfo,
					deleteFailed: true,
					deleting: false,
				},
			};
		case DELETE_BORROWER_SUCCESSFUL: {
			console.log(state.borrowerData.borrowers);
			console.log(action);
			const newBorrowers = state.borrowerData.borrowers.filter(
				(borrower) => {
					return borrower.borrowerCardNo != action.deletedId;
				}
			);
			return {
				...state,
				borrowerData: {
					...state.borrowerData,
					borrowers: newBorrowers,
				},
				requestInfo: {
					...state.requestInfo,
					deleteSuccess: true,
					deleting: false,
				},
			};
		}
		case UPDATE_BORROWER_REQUEST:
			return {
				...state,
				borrowerData: {
					...state.borrowerData,
				},
				requestInfo: {
					...state.requestInfo,
					updating: true,
					updateFailed: false,
					updateSuccess: false,
				},
			};
		case UPDATE_BORROWER_FAILURE:
			return {
				...state,
				borrowerData: {
					...state.borrowerData,
				},
				requestInfo: {
					...state.requestInfo,
					updateFailed: true,
					updating: false,
				},
			};
		case UPDATE_BORROWER_SUCCESSFUL: {
			if (state.borrowerData.readPending) {
				/* Not needed if we continue to use toggle instead of handle refresh*/
				return {
					...state,
					borrowerData: {
						...state.borrowerData,
					},
					requestInfo: {
						...state.requestInfo,
						//updatedSuccess: true,
						//updating: false,
					},
				};
			} else {
				let updatedBorrowers = state.borrowerData.borrowers.map(
					(borrower) =>
						action.updatedBorrower.borrowerCardNo ===
						borrower.borrowerCardNo
							? action.updatedBorrower
							: borrower
				);
				return {
					...state,
					borrowerData: {
						...state.borrowerData,
						borrowers: updatedBorrowers,
					},
					requestInfo: {
						...state.requestInfo,
						updateSuccess: true,
						updating: false,
					},
				};
			}
		}
		case CREATE_BORROWER_REQUEST:
			return {
				...state,
				borrowerData: {
					...state.borrowerData,
				},
				requestInfo: {
					...state.requestInfo,
					creating: true,
					createFailed: false,
					createSuccess: false,
				},
			};
		case CREATE_BORROWER_FAILURE:
			return {
				...state,
				borrowerData: {
					...state.borrowerData,
				},
				requestInfo: {
					...state.requestInfo,
					createFailed: true,
					creating: false,
				},
			};
		case CREATE_BORROWER_SUCCESSFUL: {
			let updatedBorrowerArray = [
				...state.borrowerData.borrowers,
				action.createdBorrower,
			];
			return {
				...state,
				borrowerData: {
					...state.borrowerData,
					borrowers: updatedBorrowerArray,
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
