'use strict';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as borrowerActions from '../../actions/borrowerActions';
import BorrowerRender from './BorrowerRender';
//import BorrowerHeader from './BorrowerHeader';

const BorrowerContainer = (props) => {
	const { actions } = props;
	useEffect(() => {
		//actions.readBranches();
	}, []);

	return (
		<div>
			{/* <BorrowerHeader /> */}
			<div className="jumbotron">
				<h1>Borrower Management</h1>
			</div>
			<BorrowerRender
				{...props}
				handleCheckout={(book, borrower, branch) =>
					actions.processCheckout(book, borrower, branch)
				}
				handleLoginAttempt={(cardNo) => actions.attemptLogin(cardNo)}
				startCheckout={() => actions.startCheckout()}
				startReturn={() => actions.startReturn()}
				selectBranch={(branch) => actions.selectBranchForCheckout(branch)}
			/>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		borrower: state.borrowerReducer.loggedInBorrower,
		borrowerDashboardInfo: state.borrowerReducer.borrowerDashboardInfo,
		requestInfo: state.borrowerReducer.requestInfo,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(borrowerActions, dispatch),
	};
}

BorrowerContainer.propTypes = {
	actions: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(BorrowerContainer);
