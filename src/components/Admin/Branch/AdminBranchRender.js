"use strict"

import React from 'react';
import PropTypes from 'prop-types';

const BranchRender = ({ branchData }) => {

    function createBranchRow(branch){
        return (
            <tr key={branch.branchId}>
                <td> {branch.branchId} </td>
                <td> {branch.branchName} </td>
                <td> {branch.branchAddress} </td>
            </tr>
        );
    }

    let content = '';

    if(!branchData || branchData.requestPending){
        content = (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
    console.log(branchData);
    if(branchData && branchData.requestSuccessful){
        console.log("start123");
        content =
            (<table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {branchData.branches.map((branch) => createBranchRow(branch))}
                </tbody>
            </table>)
        console.log("end123");
    }

    if(branchData && branchData.requestFailed){
        console.log("data failed but not null");
        content =
        (
            <div className="alert alert-danger" role="alert">
                Error while loading branches!
            </div>
        )
    }

    return(
        <div>
            <h1>Branches</h1>
            {content}
        </div>
    );
}

BranchRender.propTypes = {
    branchData: PropTypes.object
};

export default BranchRender;
