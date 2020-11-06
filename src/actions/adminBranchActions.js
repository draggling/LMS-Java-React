
import axios from 'axios'

import { READ_BRANCHES_SUCCESSFUL, READ_BRANCHES_FAILURE, READ_BRANCHES_PENDING} from '../constants/actionTypes';

export const readBranches = () => {
  return dispatch => {
      dispatch(_readBranchStarted());

      return axios.get(`http://localhost:8090/getLibraryBranches`)
      .then(res => {
          dispatch(_readBranchSuccess(res));
      })
      .catch( (error) => {
          console.log(error);
          dispatch(_readBranchFailed(error));
      });


  };
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
