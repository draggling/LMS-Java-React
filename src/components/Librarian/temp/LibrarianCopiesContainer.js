'use strict';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as librarianCopiesActions from '../../actions/librarianCopiesActions.js';
import LibrarianCopiesRender from './LibrarianCopiesRender';
import LibrarianHeader from './LibrarianHeader';

const LibrarianCopiesContainer = (props) => {
	const { actions } = props;
	useEffect(() => {
		actions.createCopies();
	}, []);

	return (
		<div>
			<LibrarianHeader />
			<div className="jumbotron">
				<h1>Librarian Copies Management</h1>
			</div>
			<LibrarianCopiesRender
				{...props}
				handleRefresh={() => actions.createCopies()}
				handleUpdate={(id, copiesName, copiesAddress) =>
					actions.updateCopies(id, copiesName, copiesAddress)
				}
			/>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		copiesData: state.copiesReducer.copiesData,
		requestInfo: state.copiesReducer.requestInfo,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(librarianCopiesActions, dispatch),
	};
}

LibrarianCopiesContainer.propTypes = {
	actions: PropTypes.object,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LibrarianCopiesContainer);
