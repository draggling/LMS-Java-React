'use strict';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as adminLoanActions from '../../../actions/adminLoanActions.js';
import AdminLoanRender from './AdminLoanRender';
import AdminHeader from '../AdminHeader';

const AdminLoanContainer = (props) => {
	const { actions } = props;
	useEffect(() => {
		actions.readLoans();
	}, []);

	return (
		<div>
			<AdminHeader />
			<div className="jumbotron">
				<img width="65pxpx" height="65px" src="../../images/admin.png" />
					<h1>&nbsp;&nbsp;Loans&nbsp;&nbsp;</h1>
				<img width="65pxpx" height="65px" src="../../images/admin.png" />
			</div>
			<AdminLoanRender
				{...props}
				handleRefresh={() => actions.readLoans()}
				handleExtend={(
					bookId,
					branchId,
					cardNo,
					difference,
				) =>
					actions.extendLoan(
						bookId,
						branchId,
						cardNo,
						difference,
					)
				}
			/>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		loanData: state.loanReducer.loanData,
		requestInfo: state.loanReducer.requestInfo,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(adminLoanActions, dispatch),
	};
}

AdminLoanContainer.propTypes = {
	actions: PropTypes.object,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminLoanContainer);
