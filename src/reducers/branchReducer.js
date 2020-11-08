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
		case READ_BRANCHES_SUCCESSFUL:
			return {
				...state,
				branchData: {
					branches: action.data,
				},
				requestInfo: {
					readSuccessful: true,
					readPending: false,
				},
			};
		case READ_BRANCHES_PENDING:
			return { ...state, requestInfo: { readPending: true } };
		case READ_BRANCHES_FAILURE:
			return {
				...state,
				requestInfo: { readFailed: true, readPending: false },
			};
		case DELETE_BRANCH_REQUEST:
			return {
				...state,
				branchData: {
					...state.branchData,
				},
				requestInfo: {
					deleting: true,
					deleteBranchFailed: false,
					deleteSuccess: true,
				},
			};
		case DELETE_BRANCH_FAILURE:
			return {
				...state,
				branchData: {
					...state.branchData,
				},
				requestInfo: {
					deleteBranchFailed: true,
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
				},
				requestInfo: {
					branches: newBranches,
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
					updating: true,
					updateBranchFailed: false,
					updateSuccess: true,
				},
			};
		case UPDATE_BRANCH_FAILURE:
			return {
				...state,
				branchData: {
					...state.branchData,
				},
				requestInfo: {
					updateBranchFailed: true,
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
					creating: true,
					createBranchFailed: false,
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
					createBranchFailed: true,
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
					createSuccess: true,
					creating: false,
				},
			};
		}
		default:
			return state;
	}
}
