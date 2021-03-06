'use strict';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as adminAuthorActions from '../../../actions/adminAuthorActions.js';
import AdminAuthorRender from './AdminAuthorRender';
import AdminHeader from '../AdminHeader';

const AdminAuthorContainer = (props) => {
	const { actions } = props;
	useEffect(() => {
		actions.readAuthors();
	}, []);

	return (
		<div>
			<AdminHeader />
			<div className="jumbotron">
				<h1>Authors</h1>
			</div>
			<AdminAuthorRender
				{...props}
				handleRefresh={() => actions.readAuthors()}
				handleDelete={(authorId) => actions.deleteAuthor(authorId)}
				handleUpdate={(authorId, authorName) =>
					actions.updateAuthor(authorId, authorName)
				}
				handleCreate={(authorName) => actions.createAuthor(authorName)}
			/>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		authorData: state.authorReducer.authorData,
		requestInfo: state.authorReducer.requestInfo,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(adminAuthorActions, dispatch),
	};
}

AdminAuthorContainer.propTypes = {
	actions: PropTypes.object,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminAuthorContainer);
