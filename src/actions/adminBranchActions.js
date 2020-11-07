
import axios from 'axios'

import {
    READ_BRANCHES_PENDING, READ_BRANCHES_FAILURE, READ_BRANCHES_SUCCESSFUL,
    DELETE_BRANCH_REQUEST, DELETE_BRANCH_FAILURE, DELETE_BRANCH_SUCCESSFUL,
    UPDATE_BRANCH_REQUEST, UPDATE_BRANCH_FAILURE, UPDATE_BRANCH_SUCCESSFUL,
    CREATE_BRANCH_REQUEST, CREATE_BRANCH_FAILURE, CREATE_BRANCH_SUCCESSFUL} from '../constants/actionTypes';
import {ADMIN_PORT} from '../constants/connections';

export const readBranches = () => {
  return dispatch => {
      dispatch(_readBranchStarted());

      return axios.get(ADMIN_PORT + 'getLibraryBranches')
      .then(res => {
          dispatch(_readBranchSuccess(res));
      })
      .catch( (error) => {
          console.log(error);
          dispatch(_readBranchFailed(error));
      });


  };
}

export const deleteBranch = (id) =>{
    return dispatch => {
            dispatch(deleteBranchRequest());
            return axios.delete(ADMIN_PORT + 'deleteLibraryBranch', { data: { 'branchId': id } }
            ).then((res) => {
                dispatch(deleteBranchSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(deleteBranchFailed(error));
            });
        }
    }

export const updateBranch = (id, branchName, branchAddress) =>{
    return dispatch => {
            dispatch(updateBranchRequest());
            console.log("id = " + id + ", branchName = " + branchName + ", branchAddress = " + branchAddress);
            return axios.put(ADMIN_PORT + 'updateLibraryBranch', { 'branchId': id, 'branchName': branchName, 'branchAddress': branchAddress }
            ).then((res) => {
                console.log("updateBranch res:");
                console.log(res);
                dispatch(updateBranchSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(updateBranchFailed(error));
            });
        }
    }

    export const createBranch = (branchName, branchAddress) =>{
        return dispatch => {
                dispatch(createBranchRequest());
                console.log("branchName = " + branchName + ", branchAddress = " + branchAddress);
                return axios.post(ADMIN_PORT + 'addLibraryBranch', {'branchName': branchName, 'branchAddress': branchAddress }
                ).then((res) => {
                    console.log("createBranch res:");
                    console.log(res);
                    dispatch(createBranchSuccess(res));
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(createBranchFailed(error));
                });
            }
        }


const _readBranchSuccess = (res) => {
    return {
        type: READ_BRANCHES_SUCCESSFUL,
        data:  res.data
    };
}

const _readBranchFailed = (error) => {
    return {
        type: READ_BRANCHES_FAILURE,
        error
    };
}

const _readBranchStarted = () => {
    return {
        type: READ_BRANCHES_PENDING
    };
}

const deleteBranchRequest = () => {
    return {
        type: DELETE_BRANCH_REQUEST,
    };
}

const deleteBranchSuccess = (res) => {
    return {
        type: DELETE_BRANCH_SUCCESSFUL,
        data:  res.data,
        deletedId: res.data.branchId,
    };
}

const deleteBranchFailed = (error) => {
    return {
        type: DELETE_BRANCH_FAILURE,
        error
    };
}

const updateBranchRequest = () => {
    return {
        type: UPDATE_BRANCH_REQUEST,
    };
}

const updateBranchSuccess = (res) => {
    return {
        type: UPDATE_BRANCH_SUCCESSFUL,
        updatedBranch:  res.data,
    };
}

const updateBranchFailed = (error) => {
    return {
        type: UPDATE_BRANCH_FAILURE,
        error
    };
}

const createBranchRequest = () => {
    return {
        type: CREATE_BRANCH_REQUEST,
    };
}

const createBranchSuccess = (res) => {
    return {
        type: CREATE_BRANCH_SUCCESSFUL,
        createdBranch:  res.data,
    };
}

const createBranchFailed = (error) => {
    return {
        type: CREATE_BRANCH_FAILURE,
        error
    };
}
