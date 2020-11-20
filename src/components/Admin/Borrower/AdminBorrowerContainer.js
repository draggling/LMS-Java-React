'use strict';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as adminBorrowerActions from '../../../actions/adminBorrowerActions.js';
import AdminBorrowerRender from './AdminBorrowerRender';
import AdminHeader from '../AdminHeader';

const AdminBorrowerContainer = (props) => {
	const { actions } = props;
	useEffect(() => {
		actions.readBorrowers();
	}, []);

	return (
		<div>
			<AdminHeader />
			<div className="jumbotron">
				<h1>Borrowers</h1>
			</div>
			<AdminBorrowerRender
				{...props}
				handleRefresh={() => actions.readBorrowers()}
				handleDelete={(borrowerCardNo) => actions.deleteBorrower(borrowerCardNo)}
				handleUpdate={(borrowerCardNo, borrowerName, borrowerAddress, borrowerPhone) =>
					actions.updateBorrower(borrowerCardNo, borrowerName, borrowerAddress, borrowerPhone)
				}
				handleCreate={(borrowerName, borrowerAddress, borrowerPhone) =>
					actions.createBorrower(borrowerName, borrowerAddress, borrowerPhone)
				}
			/>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		borrowerData: state.borrowerReducer.borrowerData,
		requestInfo: state.borrowerReducer.requestInfo,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(adminBorrowerActions, dispatch),
	};
}

AdminBorrowerContainer.propTypes = {
	actions: PropTypes.object,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminBorrowerContainer);
