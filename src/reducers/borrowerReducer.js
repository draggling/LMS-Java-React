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
	BORROWER_BACK_TO_BRANCH_SELECT,
	BORROWER_CHECKOUT_PENDING,
	BORROWER_CHECKOUT_FAILURE,
	BORROWER_CHECKOUT_SUCCESSFUL,
	BORROWER_CLOSE_CHECKOUT_MODAL,
	BORROWER_CLOSE_RETURN_MODAL,
	BORROWER_DASHBOARD_READ_BOOKS_FAILED,
	BORROWER_DASHBOARD_READ_BOOKS_SUCCESSFUL,
	BORROWER_DASHBOARD_SELECT_BRANCH,
	BORROWER_LOGIN_PENDING,
	BORROWER_LOGIN_FAILURE,
	BORROWER_LOGIN_SUCCESSFUL,
	BORROWER_LOGOUT,
	BORROWER_READ_ACTIVE_LOANS_FAILED,
	BORROWER_READ_ACTIVE_LOANS_SUCCESSFUL,
	BORROWER_READ_ALL_BRANCHES_FAILED,
	BORROWER_READ_ALL_BRANCHES_SUCCESSFUL,
	BORROWER_START_CHECKOUT,
	BORROWER_START_RETURN,
	BORROWER_RETURN_PENDING,
	BORROWER_RETURN_FAILURE,
	BORROWER_RETURN_SUCCESSFUL,
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
			const newBorrowers = state.borrowerData.borrowers.filter((borrower) => {
				return borrower.borrowerCardNo != action.deletedId;
			});
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
		case UPDATE_BORROWER_SUCCESSFUL:
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
				let updatedBorrowers = state.borrowerData.borrowers.map((borrower) =>
					action.updatedBorrower.borrowerCardNo === borrower.borrowerCardNo
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
		case BORROWER_LOGIN_PENDING:
			return {
				...state,
				borrowerDashboardInfo: null,
				loggedInBorrower: null,
				requestInfo: {
					...state.requestInfo,
					loginPending: true,
					loginSuccessful: false,
					loginFailed: false,
				},
			};
		case BORROWER_LOGIN_FAILURE:
			return {
				...state,
				borrowerDashboardInfo: null,
				loggedInBorrower: null,
				requestInfo: {
					...state.requestInfo,
					loginPending: false,
					loginSuccessful: false,
					loginFailed: true,
				},
			};
		case BORROWER_LOGIN_SUCCESSFUL:
			return {
				...state,
				borrowerDashboardInfo: {
					isCheckingOut: false,
					isReturning: false,
				},
				loggedInBorrower: action.data,
				requestInfo: {
					...state.requestInfo,
					loginPending: false,
					loginSuccessful: true,
					loginFailed: false,
				},
			};
		case BORROWER_LOGOUT:
			return {
				borrowerDashboardInfo: null,
				loggedInBorrower: null,
				requestInfo: null,
			};

		case BORROWER_START_CHECKOUT:
			return {
				...state,
				borrowerDashboardInfo: {
					isCheckingOut: true,
					isReturning: false,
				},
				requestInfo: {
					...state.requestInfo,
					branchesPending: true,
					branchesSuccessful: false,
					branchesFailed: false,
				},
			};
		case BORROWER_READ_ALL_BRANCHES_FAILED:
			return {
				...state,
				borrowerDashboardInfo: {
					...state.borrowerDashboardInfo,
				},
				requestInfo: {
					...state.requestInfo,
					branchesPending: false,
					branchesSuccessful: false,
					branchesFailed: true,
				},
			};
		case BORROWER_READ_ALL_BRANCHES_SUCCESSFUL:
			return {
				...state,
				borrowerDashboardInfo: {
					...state.borrowerDashboardInfo,
					branches: action.data,
				},
				requestInfo: {
					branchesPending: false,
					branchesSuccessful: true,
					branchesFailed: false,
					loginPending: false,
					loginSuccessful: true,
					loginFailed: false,
				},
			};
		case BORROWER_BACK_TO_BRANCH_SELECT:
			return {
				...state,
				borrowerDashboardInfo: {
					...state.borrowerDashboardInfo,
					selectedBranch: action.selectedBranch,
				},
				requestInfo: {
					...state.requestInfo,
					booksPending: false,
					booksSuccessful: false,
					booksFailed: false,
				},
			};

		case BORROWER_DASHBOARD_SELECT_BRANCH:
			return {
				...state,
				borrowerDashboardInfo: {
					...state.borrowerDashboardInfo,
					selectedBranch: action.selectedBranch,
				},
				requestInfo: {
					...state.requestInfo,
					booksPending: true,
					booksSuccessful: false,
					booksFailed: false,
				},
			};
		case BORROWER_DASHBOARD_READ_BOOKS_SUCCESSFUL:
			return {
				...state,
				borrowerDashboardInfo: {
					...state.borrowerDashboardInfo,
					books: action.booksAvailable,
				},
				requestInfo: {
					...state.requestInfo,
					booksPending: false,
					booksSuccessful: true,
					booksFailed: false,
				},
			};
		case BORROWER_DASHBOARD_READ_BOOKS_FAILED:
			return {
				...state,
				borrowerDashboardInfo: {
					...state.borrowerDashboardInfo,
				},
				requestInfo: {
					...state.requestInfo,
					booksPending: false,
					booksSuccessful: false,
					booksFailed: true,
				},
			};

		case BORROWER_CHECKOUT_PENDING:
			return {
				...state,
				borrowerDashboardInfo: {
					...state.borrowerDashboardInfo,
				},
				requestInfo: {
					...state.requestInfo,
					checkoutPending: true,
					checkoutSuccessful: false,
					checkoutFailed: false,
				},
			};
		case BORROWER_CHECKOUT_FAILURE:
			return {
				...state,
				borrowerDashboardInfo: {
					...state.borrowerDashboardInfo,
				},
				requestInfo: {
					...state.requestInfo,
					checkoutPending: false,
					checkoutSuccessful: false,
					checkoutFailed: true,
				},
			};
		case BORROWER_CHECKOUT_SUCCESSFUL: {
			let updateAvailableBookList = state.borrowerDashboardInfo.books.filter(
				(book) => {
					return book.bookId != action.newLoan.key.bookId;
				}
			);
			return {
				...state,
				borrowerDashboardInfo: {
					...state.borrowerDashboardInfo,
					books: updateAvailableBookList,
					newestLoan: action.newLoan,
				},
				requestInfo: {
					...state.requestInfo,
					checkoutPending: false,
					checkoutSuccessful: true,
					checkoutFailed: false,
				},
			};
		}
		case BORROWER_CLOSE_CHECKOUT_MODAL: {
			return {
				...state,
				borrowerDashboardInfo: {
					...state.borrowerDashboardInfo,
					newestLoan: null,
				},
				requestInfo: {
					...state.requestInfo,
					checkoutSuccessful: false,
				},
			};
		}
		case BORROWER_START_RETURN:
			return {
				...state,
				borrowerDashboardInfo: {
					isCheckingOut: false,
					isReturning: true,
					selectedLoan: null,
				},
				requestInfo: {
					...state.requestInfo,
					loansPending: true,
					loansSuccessful: false,
					loansFailed: false,
				},
			};
		case BORROWER_READ_ACTIVE_LOANS_FAILED:
			return {
				...state,
				borrowerDashboardInfo: {
					...state.borrowerDashboardInfo,
				},
				requestInfo: {
					...state.requestInfo,
					loansPending: false,
					loansSuccessful: false,
					loansFailed: true,
				},
			};
		case BORROWER_READ_ACTIVE_LOANS_SUCCESSFUL:
			return {
				...state,
				borrowerDashboardInfo: {
					...state.borrowerDashboardInfo,
					loans: action.loans,
				},
				requestInfo: {
					...state.requestInfo,
					loansPending: false,
					loansSuccessful: true,
					loansFailed: false,
				},
			};

		case BORROWER_RETURN_PENDING:
			return {
				...state,
				borrowerDashboardInfo: {
					...state.borrowerDashboardInfo,
				},
				requestInfo: {
					...state.requestInfo,
					returnPending: true,
					returnSuccessful: false,
					returnFailed: false,
				},
			};
		case BORROWER_RETURN_FAILURE:
			return {
				...state,
				borrowerDashboardInfo: {
					...state.borrowerDashboardInfo,
				},
				requestInfo: {
					...state.requestInfo,
					returnPending: false,
					returnSuccessful: false,
					returnFailed: true,
				},
			};
		case BORROWER_RETURN_SUCCESSFUL: {
			const newLoanList = state.borrowerDashboardInfo.loans.filter((loan) => {
				return (
					loan.key.bookId != action.loan.key.bookId &&
					loan.key.branchId != action.loan.key.branchId &&
					loan.key.cardNo != action.loan.key.cardNo
				);
			});
			return {
				...state,
				borrowerDashboardInfo: {
					...state.borrowerDashboardInfo,
					loans: newLoanList,
					updatedLoan: action.loan,
				},
				requestInfo: {
					...state.requestInfo,
					returnPending: false,
					returnSuccessful: true,
					returnFailed: false,
				},
			};
		}
		case BORROWER_CLOSE_RETURN_MODAL: {
			return {
				...state,
				borrowerDashboardInfo: {
					...state.borrowerDashboardInfo,
					updatedLoan: null,
				},
				requestInfo: {
					...state.requestInfo,
					returnSuccessful: false,
				},
			};
		}
		default:
			return state;
	}
}
