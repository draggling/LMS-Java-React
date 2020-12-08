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
		actions.readPublishers();
		actions.readAuthors();
		actions.readGenres();
	}, []);

	return (
		<div>
			<AdminHeader />
			<div className="jumbotron">
				<img width="65pxpx" height="65px" src="../../images/admin.png" />
					<h1>&nbsp;&nbsp;Books&nbsp;&nbsp;</h1>
				<img width="65pxpx" height="65px" src="../../images/admin.png" />
			</div>
			<AdminBookRender
				{...props}
				handleRefresh={() => actions.readBooks()}
				handleDelete={(bookId) => actions.deleteBook(bookId)}
				handleUpdate={(bookId, title, publisher, authors, genres) =>
					actions.updateBook(bookId, title, publisher, authors, genres)
				}
				handleCreate={(title, publisherId, authors, genres) => actions.createBook(title, publisherId, authors, genres)}
			/>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		bookData: state.bookReducer.bookData,
		publisherData: state.bookReducer.publisherData,
		authorData: state.bookReducer.authorData,
		genreData: state.bookReducer.genreData,
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
