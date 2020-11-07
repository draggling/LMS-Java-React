import {
    READ_BRANCHES_SUCCESSFUL, READ_BRANCHES_PENDING, READ_BRANCHES_FAILURE,
    DELETE_BRANCH_REQUEST, DELETE_BRANCH_FAILURE, DELETE_BRANCH_SUCCESSFUL,
    UPDATE_BRANCH_REQUEST, UPDATE_BRANCH_FAILURE, UPDATE_BRANCH_SUCCESSFUL,
    CREATE_BRANCH_REQUEST, CREATE_BRANCH_FAILURE, CREATE_BRANCH_SUCCESSFUL} from '../constants/actionTypes';

export default function branchReducer(state = {}, action) {
  switch (action.type) {
    case READ_BRANCHES_SUCCESSFUL:
      return {...state, branchData: { branches: action.data, requestSuccessful: true, requestPending: false } };
    case READ_BRANCHES_PENDING:
      return {...state, branchData: {requestPending: true } };
    case READ_BRANCHES_FAILURE:
      return {...state, branchData: { requestFailed: true, requestPending: false } };
    case DELETE_BRANCH_REQUEST:
        return {...state, updating: true};
    case DELETE_BRANCH_FAILURE:
        return {...state, updateContactFailed: true, updating: false};
    case DELETE_BRANCH_SUCCESSFUL:
        {
        const newBranches = state.branchData.branches.filter(branch => {
            return branch.branchId != action.deletedId;
        });
        return {...state, updateSuccess: true, updating: false, branchData: {...state.branchData, branches: newBranches}};
        }
    case UPDATE_BRANCH_REQUEST:
        return {...state, updating: true}
    case UPDATE_BRANCH_FAILURE:
        return {...state, updateContactFailed: true, updating: false};
    case UPDATE_BRANCH_SUCCESSFUL:
        {
            console.log("state");
            console.log(state);
            if(state.branchData.requestPending) {
                return {...state, updatedSuccess: true, updating: false}
            } else {
                let updatedBranches = state.branchData.branches.map(branch => (action.updatedBranch.branchId === branch.branchId) ? action.updatedBranch : branch);
                return {...state, updateSuccess: true, updating: false, branchData: {...state.branchData, branches: updatedBranches}};
            }
        }

        case CREATE_BRANCH_REQUEST:
            return {...state, updating: true}
        case CREATE_BRANCH_FAILURE:
            return {...state, updateContactFailed: true, updating: false};
        case CREATE_BRANCH_SUCCESSFUL:
            {
                let updatedBranchArray = [...state.branchData.branches, action.createdBranch]
                return {...state, updateSuccess: true, updating: false, branchData: {...state.branchData, branches: updatedBranchArray}};
            }

    default:
      return state;
  }
}
