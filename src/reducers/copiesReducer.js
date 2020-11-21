import {
	READ_COPIES_SUCCESSFUL,
	READ_COPIES_PENDING,
	READ_COPIES_FAILURE,
	CREATE_COPIES_REQUEST,
	CREATE_COPIES_FAILURE,
	CREATE_COPIES_SUCCESSFUL,
} from '../constants/actionTypes';

export default function copiesReducer(state = {}, action) {
	switch (action.type) {
		case READ_COPIES_PENDING:
			return {
				...state,
				requestInfo: { ...state.requestInfo, readPending: true },
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
		case READ_COPIES_SUCCESSFUL:
			return {
				...state,
				copiesData: {
					copies: action.data,
				},
				requestInfo: {
					...state.requestInfo,
					readFailed: false,
					readSuccessful: true,
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
			let updatedCopiesArray = [
				...state.copiesData.copies,
				action.createdCopies,
			];
			return {
				...state,
				copiesData: {
					...state.copiesData,
					copies: updatedCopiesArray,
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
