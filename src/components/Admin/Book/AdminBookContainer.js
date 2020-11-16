'use strict';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as adminBookActions from '../../../actions/adminBookActions.js';
import AdminBookRender from './AdminBookRender';
import AdminHeader from '../AdminHeader';

const AdminBookContainer = (props) => {
	const { actions } = props;
	useEffect(() => {
		actions.readBooks();
	}, []);

	return (
		<div>
			<AdminHeader />
			<div className="jumbotron">
				<h1>Books</h1>
			</div>
			<AdminBookRender
				{...props}
				handleRefresh={() => actions.readBooks()}
				handleDelete={(bookId, publisherId) => actions.deleteBook(bookId, publisherId)}
				handleUpdate={(bookId, title) =>
					actions.updateBook(bookId, title)
				}
				handleCreate={(title, publisherId) => actions.createBook(title, publisherId)}
			/>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		bookData: state.bookReducer.bookData,
		requestInfo: state.bookReducer.requestInfo,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(adminBookActions, dispatch),
	};
}

AdminBookContainer.propTypes = {
	actions: PropTypes.object,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminBookContainer);
