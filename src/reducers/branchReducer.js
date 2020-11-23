import {
	READ_BRANCHES_SUCCESSFUL,
	READ_BRANCHES_PENDING,
	READ_BRANCHES_FAILURE,
	DELETE_BRANCH_REQUEST,
	DELETE_BRANCH_FAILURE,
	DELETE_BRANCH_SUCCESSFUL,
	UPDATE_BRANCH_REQUEST,
	UPDATE_BRANCH_FAILURE,
	UPDATE_BRANCH_SUCCESSFUL,
	CREATE_BRANCH_REQUEST,
	CREATE_BRANCH_FAILURE,
	CREATE_BRANCH_SUCCESSFUL,
} from '../constants/actionTypes';

export default function branchReducer(state = {}, action) {
	switch (action.type) {
		case READ_BRANCHES_PENDING:
			return {
				...state,
				requestInfo: { ...state.requestInfo, readPending: true },
			};
		case READ_BRANCHES_FAILURE:
			return {
				...state,
				requestInfo: {
					...state.requestInfo,
					readFailed: true,
					readPending: false,
				},
			};
		case READ_BRANCHES_SUCCESSFUL:
			return {
				...state,
				branchData: {
					branches: action.data,
				},
				requestInfo: {
					...state.requestInfo,
					readFailed: false,
					readSuccessful: true,
					readPending: false,
					test: true,
				},
			};
		case DELETE_BRANCH_REQUEST:
			return {
				...state,
				branchData: {
					...state.branchData,
				},
				requestInfo: {
					...state.requestInfo,
					deleting: true,
					deleteFailed: false,
					deleteSuccess: false,
				},
			};
		case DELETE_BRANCH_FAILURE:
			return {
				...state,
				branchData: {
					...state.branchData,
				},
				requestInfo: {
					...state.requestInfo,
					deleteFailed: true,
					deleting: false,
				},
			};
		case DELETE_BRANCH_SUCCESSFUL: {
			const newBranches = state.branchData.branches.filter((branch) => {
				return branch.branchId != action.deletedId;
			});
			return {
				...state,
				branchData: {
					...state.branchData,
					branches: newBranches,
				},
				requestInfo: {
					...state.requestInfo,
					deleteSuccess: true,
					deleting: false,
				},
			};
		}
		case UPDATE_BRANCH_REQUEST:
			return {
				...state,
				branchData: {
					...state.branchData,
				},
				requestInfo: {
					...state.requestInfo,
					updating: true,
					updateFailed: false,
					updateSuccess: false,
				},
			};
		case UPDATE_BRANCH_FAILURE:
			return {
				...state,
				branchData: {
					...state.branchData,
				},
				requestInfo: {
					...state.requestInfo,
					updateFailed: true,
					updating: false,
				},
			};
		case UPDATE_BRANCH_SUCCESSFUL: {
			if (state.branchData.readPending) {
				/* Not needed if we continue to use toggle instead of handle refresh*/
				return {
					...state,
					branchData: {
						...state.branchData,
					},
					requestInfo: {
						...state.requestInfo,
						//updatedSuccess: true,
						//updating: false,
					},
				};
			} else {
				let updatedBranches = state.branchData.branches.map((branch) =>
					action.updatedBranch.branchId === branch.branchId
						? action.updatedBranch
						: branch
				);
				return {
					...state,
					branchData: {
						...state.branchData,
						branches: updatedBranches,
					},
					requestInfo: {
						...state.requestInfo,
						updateSuccess: true,
						updating: false,
					},
				};
			}
		}
		case CREATE_BRANCH_REQUEST:
			return {
				...state,
				branchData: {
					...state.branchData,
				},
				requestInfo: {
					...state.requestInfo,
					creating: true,
					createFailed: false,
					createSuccess: false,
				},
			};
		case CREATE_BRANCH_FAILURE:
			return {
				...state,
				branchData: {
					...state.branchData,
				},
				requestInfo: {
					...state.requestInfo,
					createFailed: true,
					creating: false,
				},
			};
		case CREATE_BRANCH_SUCCESSFUL: {
			let updatedBranchArray = [
				...state.branchData.branches,
				action.createdBranch,
			];
			return {
				...state,
				branchData: {
					...state.branchData,
					branches: updatedBranchArray,
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
