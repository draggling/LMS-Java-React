'use strict';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as adminGenreActions from '../../../actions/adminGenreActions.js';
import AdminGenreRender from './AdminGenreRender';
import AdminHeader from '../AdminHeader';

const AdminGenreContainer = (props) => {
	const { actions } = props;
	useEffect(() => {
		actions.readGenres();
	}, []);

	return (
		<div>
			<AdminHeader />
			<div className="jumbotron">
				<h1>Genres</h1>
			</div>
			<AdminGenreRender
				{...props}
				handleRefresh={() => actions.readGenres()}
				handleDelete={(genreId) => actions.deleteGenre(genreId)}
				handleUpdate={(genreId,genreName) =>
					actions.updateGenre(
						genreId,
						genreName,
					)
				}
				handleCreate={(genreName) =>
					actions.createGenre(
						genreName,
					)
				}
			/>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		genreData: state.genreReducer.genreData,
		requestInfo: state.genreReducer.requestInfo,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(adminGenreActions, dispatch),
	};
}

AdminGenreContainer.propTypes = {
	actions: PropTypes.object,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminGenreContainer);
