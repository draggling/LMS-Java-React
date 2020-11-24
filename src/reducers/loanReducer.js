import {
	READ_LOANS_SUCCESSFUL,
	READ_LOANS_PENDING,
	READ_LOANS_FAILURE,
	EXTEND_LOAN_REQUEST,
	EXTEND_LOAN_FAILURE,
	EXTEND_LOAN_SUCCESSFUL,
} from '../constants/actionTypes';

export default function loanReducer(state = {}, action) {
	switch (action.type) {
		case READ_LOANS_PENDING:
			return {
				...state,
				requestInfo: { ...state.requestInfo, readPending: true },
			};
		case READ_LOANS_FAILURE:
			return {
				...state,
				requestInfo: {
					...state.requestInfo,
					readFailed: true,
					readPending: false,
				},
			};
		case READ_LOANS_SUCCESSFUL:
			return {
				...state,
				loanData: {
					loans: action.data,
				},
				requestInfo: {
					...state.requestInfo,
					readFailed: false,
					readSuccessful: true,
					readPending: false,
				},
			};
		case EXTEND_LOAN_REQUEST:
			return {
				...state,
				loanData: {
					...state.loanData,
				},
				requestInfo: {
					...state.requestInfo,
					extending: true,
					extendFailed: false,
					extendSuccess: false,
				},
			};
		case EXTEND_LOAN_FAILURE:
			return {
				...state,
				loanData: {
					...state.loanData,
				},
				requestInfo: {
					...state.requestInfo,
					extendFailed: true,
					extending: false,
				},
			};
		case EXTEND_LOAN_SUCCESSFUL: {
			if (state.loanData.readPending) {
				return {
					...state,
					loanData: {
						...state.loanData,
					},
					requestInfo: {
						...state.requestInfo,
					},
				};
			} else {
				let extendLoans = state.loanData.loans.map((loan) =>
					action.extendLoan.key.bookId === loan.key.bookId &&
					action.extendLoan.key.branchId === loan.key.branchId &&
					action.extendLoan.key.cardNo === loan.key.cardNo
						? action.extendLoan
						: loan
				);
				return {
					...state,
					loanData: {
						...state.loanData,
						loans: extendLoans,
					},
					requestInfo: {
						...state.requestInfo,
						extendSuccess: true,
						extending: false,
					},
				};
			}
		}
		default:
			return state;
	}
}
