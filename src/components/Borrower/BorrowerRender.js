'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import BorrowerLoginForm from './BorrowerLoginForm';
import { Alert, Spinner } from 'reactstrap';
import BorrowerDashboard from './BorrowerDashboard';
//import { MDBDataTable } from 'mdbreact';

const BorrowerRender = ({
	borrower,
	borrowerDashboardInfo,
	handleCheckout,
	handleLoginAttempt,
	requestInfo,
	selectBranch,
	startCheckout,
	startReturn,
}) => {
	let content = '';
	let doesRequestInfoExist = requestInfo;
	if (!borrower && !doesRequestInfoExist) {
		content = <BorrowerLoginForm handleLoginAttempt={handleLoginAttempt} />;
	}
	if (!borrower && doesRequestInfoExist && requestInfo.loginPending) {
		content = <Spinner type="grow" color="primary" />;
	}
	if (!borrower && doesRequestInfoExist && requestInfo.loginFailed) {
		content = (
			<div>
				<Alert color="danger">
					The entered card number does not exist in our system please try again
					or contact an administrator
				</Alert>
				<BorrowerLoginForm handleLoginAttempt={handleLoginAttempt} />
			</div>
		);
	}
	if (borrower && doesRequestInfoExist && requestInfo.loginSuccessful) {
		content = (
			<BorrowerDashboard
				borrower={borrower}
				dashboardInfo={borrowerDashboardInfo}
				handleCheckout={handleCheckout}
				requestInfo={requestInfo}
				selectBranch={selectBranch}
				startCheckout={startCheckout}
				startReturn={startReturn}
			/>
		);
	}
	return (
		<div>
			<h1>Borrower</h1>
			{content}
		</div>
	);
};

BorrowerRender.propTypes = {
	borrower: PropTypes.object,
	borrowerDashboardInfo: PropTypes.object,
	handleCheckout: PropTypes.func,
	handleLoginAttempt: PropTypes.func,
	requestInfo: PropTypes.object,
	selectBranch: PropTypes.func,
	startCheckout: PropTypes.func,
	startReturn: PropTypes.func,
};

export default BorrowerRender;
