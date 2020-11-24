'use strict';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as librarianActions from '../../../actions/librarianActions';
import LibrarianRender from './LibrarianRender';
import LibrarianHeader from '../LibrarianHeader';

const LibrarianContainer = (props) => {
	const { actions } = props;
	useEffect(() => {
		//actions.readBranches();
	}, []);

	return (
		<div>
			<LibrarianHeader />
			<div className="jumbotron">
				<h1>Librarian Management</h1>
			</div>
			<LibrarianRender
				{...props}
				handleBookCopies={(book, branch, noOfCopies) =>
					actions.setBookCopies(book, branch, noOfCopies)
				}
				handleUpdate={(id, branchName, branchAddress) => 
					actions.updateBranch(id, branchName, branchAddress)}
				startReadCopies={(branch) => actions.readCopies(branch)}
				//startReadCopies={() => actions.startsCheckout()}
				startReadNonCopies={(branch) => actions.readNonCopies(branch)}
			/>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		libraryBookCopiesInfo: state.librarianReducer.libraryBookCopiesInfo,
		libraryNonBookCopiesInfo: state.librarianReducer.libraryNonBookCopiesInfo,
		requestInfo: state.librarianReducer.requestInfo,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(librarianActions, dispatch),
	};
}

LibrarianContainer.propTypes = {
	actions: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(LibrarianContainer);