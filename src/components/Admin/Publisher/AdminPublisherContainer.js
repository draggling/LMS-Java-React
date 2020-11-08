'use strict';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as adminPublisherActions from '../../../actions/adminPublisherActions.js';
import AdminPublisherRender from './AdminPublisherRender';
import AdminHeader from '../AdminHeader';

const AdminPublisherContainer = (props) => {
	const { actions } = props;
	useEffect(() => {
		actions.readPublishers();
	}, []);

	return (
		<div>
			<AdminHeader />
			<div className="jumbotron">
				<h1>Publishers</h1>
			</div>
			<AdminPublisherRender
				{...props}
				handleRefresh={() => actions.readPublishers()}
				handleDelete={(id) => actions.deletePublisher(id)}
				handleUpdate={(
					id,
					publisherName,
					publisherAddress,
					publisherPhone
				) =>
					actions.updatePublisher(
						id,
						publisherName,
						publisherAddress,
						publisherPhone
					)
				}
				handleCreate={(
					publisherName,
					publisherAddress,
					publisherPhone
				) =>
					actions.createPublisher(
						publisherName,
						publisherAddress,
						publisherPhone
					)
				}
			/>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		publisherData: state.publisherReducer.publisherData,
		requestInfo: state.publisherReducer.requestInfo,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(adminPublisherActions, dispatch),
	};
}

AdminPublisherContainer.propTypes = {
	actions: PropTypes.object,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminPublisherContainer);
