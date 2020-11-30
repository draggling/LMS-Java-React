'use strict';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as librarianActions from '../../actions/librarianActions.js';
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
				selectBranch= {(branchId) => actions.selectBranch(branchId)}
				handleRefresh={() => actions.readBranches()}
				handleUpdate={(id, branchName, branchAddress) =>
					actions.updateBranch(id, branchName, branchAddress)}
				startReadCopies={(branch) => actions.readCopies(branch)}
				startReadNonCopies={(branch) => actions.readNonCopies(branch)}
				Switch={() => actions.Switch()}
				branchSelect={() => actions.branchSelect()}
				setCopies={(bookId, branchId, noOfCopies) => 
					actions.setCopies(bookId, branchId, noOfCopies)}
				setNonCopies={(bookId, branchId, noOfCopies) => 
					actions.setNonCopies(bookId, branchId, noOfCopies)}
			/>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		branchData: state.branchReducer.branchData,
		requestInfo: state.branchReducer.requestInfo,
		requestInfoCopies: state.copiesReducer.requestInfo,
		bookCopies: state.copiesReducer.bookCopies,
		bookNonCopies: state.copiesReducer.bookNonCopies,
		selectedBranch: state.copiesReducer.selectedBranch,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(librarianActions, dispatch),
	};
}

LibrarianBranchContainer.propTypes = {
	actions: PropTypes.object,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LibrarianBranchContainer);
