'use strict';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as librarianBranchActions from '../../actions/librarianBranchActions.js';
import LibrarianBranchRender from './LibrarianBranchRender';
import LibrarianHeader from './LibrarianHeader';

const LibrarianBranchContainer = (props) => {
	const { actions } = props;
	useEffect(() => {
		actions.readBranches();
	}, []);

	return (
		<div>
			<LibrarianHeader />
			<div className="jumbotron">
				<h1>Librarian Branch Management</h1>
			</div>
			<LibrarianBranchRender
				{...props}
				handleRefresh={() => actions.readBranches()}
				handleUpdate={(id, branchName, branchAddress) =>
					actions.updateBranch(id, branchName, branchAddress)
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
		actions: bindActionCreators(librarianBranchActions, dispatch),
	};
}

LibrarianBranchContainer.propTypes = {
	actions: PropTypes.object,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LibrarianBranchContainer);
