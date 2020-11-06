"use strict"

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as adminBranchActions from '../../../actions/adminBranchActions.js';
import AdminBranchRender from './AdminBranchRender';
import AdminHeader from '../AdminHeader';

const AdminBranchContainer = (props) => {

    useEffect(() => {
        const { actions } = props;
        actions.readBranches();
    }, [] );

    return(
        <div>
            <AdminHeader/>
            <div className="jumbotron">
                <h1>Branches</h1>
            </div>
                <AdminBranchRender {...props} />
        </div>

    );
}

function mapStateToProps(state){
    return {
        branchData: state.branchReducer.branchData
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(adminBranchActions, dispatch)
    }
}

AdminBranchContainer.propTypes = {
    actions: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(AdminBranchContainer);
