'use strict';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as adminBranchActions from '../../../actions/adminBranchActions.js';
import AdminBranchRender from './AdminBranchRender';
import AdminHeader from '../AdminHeader';

const AdminBranchContainer = (props) => {
	const { actions } = props;
	useEffect(() => {
		actions.readBranches();
	}, []);

	return (
		<div>
			<AdminHeader />
			<div className="jumbotron">
				<h1>Branches</h1>
			</div>
			<AdminBranchRender
				{...props}
				handleRefresh={() => actions.readBranches()}
				handleDelete={(id) => actions.deleteBranch(id)}
				handleUpdate={(id, branchName, branchAddress) =>
					actions.updateBranch(id, branchName, branchAddress)
				}
				handleCreate={(branchName, branchAddress) =>
					actions.createBranch(branchName, branchAddress)
				}
			/>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		branchData: state.branchReducer.branchData,
		requestInfo: state.branchReducer.requestInfo,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(adminBranchActions, dispatch),
	};
}

AdminBranchContainer.propTypes = {
	actions: PropTypes.object,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminBranchContainer);
