import { READ_BRANCHES_SUCCESSFUL, READ_BRANCHES_PENDING, READ_BRANCHES_FAILURE } from '../constants/actionTypes';

export default function branchReducer(state = {}, action) {
  switch (action.type) {
    case READ_BRANCHES_SUCCESSFUL:
      return {...state, branchData: { branches: action.data, requestSuccessful: true, requestPending: false } };
    case READ_BRANCHES_PENDING:
      return {...state, branchData: {requestPending: true } };
    case READ_BRANCHES_FAILURE:
      return {...state, branchData: { requestFailed: true } };
    default:
      return state;
  }
}
