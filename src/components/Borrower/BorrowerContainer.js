'use strict';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Button, Spinner } from 'reactstrap';
import { bindActionCreators } from 'redux';

import * as borrowerActions from '../../actions/borrowerActions';
import BorrowerLoginForm from './BorrowerLoginForm';
import CheckoutBranchTable from './CheckoutBranchTable';
import CheckoutBookTable from './CheckoutBookTable';
import ReturnLoansTable from './ReturnLoansTable';
import Header from '../Header';
//import BorrowerRender from './BorrowerRender';
//import BorrowerHeader from './BorrowerHeader';

const BorrowerContainer = (props) => {
	const { actions, borrower, borrowerDashboardInfo, requestInfo } = props;
	useEffect(() => {
		//actions.readBranches();
	}, []);
	let content = '';
	function handleCheckout(book, borrower, branch) {
		actions.processCheckout(book, borrower, branch);
	}
	function handleLoginAttempt(cardNo) {
		actions.attemptLogin(cardNo);
	}
	function handleReturn(loan) {
		actions.processReturn(loan);
	}
	function selectBranch(branch) {
		actions.selectBranchForCheckout(branch);
	}
	function startCheckout() {
		actions.startCheckout();
	}
	function startReturn() {
		actions.startReturn(borrower.borrowerCardNo);
	}

	let doesRequestInfoExist = requestInfo;
	if (!borrower) {
		if (!doesRequestInfoExist) {
			content = <BorrowerLoginForm handleLoginAttempt={handleLoginAttempt} />;
		}
		if (doesRequestInfoExist && requestInfo.loginPending) {
			content = <Spinner type="grow" color="primary" />;
		}
		if (doesRequestInfoExist && requestInfo.loginFailed) {
			content = (
				<div>
					<Alert color="danger">
						The entered card number does not exist in our system please try
						again or contact an administrator
					</Alert>
					<BorrowerLoginForm handleLoginAttempt={handleLoginAttempt} />
				</div>
			);
		}
	} else if (borrower && doesRequestInfoExist && requestInfo.loginSuccessful) {
		content = [
			//Make into its own component in the future
			<div key={0}>
				<Button onClick={startCheckout}>Check-out</Button>
				<Button onClick={startReturn}>Return</Button>
			</div>,
		];
		if (borrowerDashboardInfo.isCheckingOut) {
			if (!borrowerDashboardInfo.selectedBranch) {
				if (requestInfo.branchesPending) {
					content.push(<Spinner type="grow" color="primary" key={1} />);
				} else if (requestInfo.branchesSuccessful) {
					content.push(
						<CheckoutBranchTable
							branches={borrowerDashboardInfo.branches}
							selectBranch={selectBranch}
							key={1}
						/>
					);
				} else if (requestInfo.branchesFailed) {
					content.push(
						<Alert color="danger" key={1}>
							Their was an error trying to access library branches please
							try again later or contact and Admin
						</Alert>
					);
				}
			} else if (borrowerDashboardInfo.selectedBranch) {
				if (requestInfo.booksPending) {
					content.push(<Spinner type="grow" color="primary" key={1} />);
				} else if (requestInfo.booksSuccessful) {
					content.push(
						<CheckoutBookTable
							books={borrowerDashboardInfo.books}
							borrower={borrower}
							branch={borrowerDashboardInfo.selectedBranch}
							handleCheckout={handleCheckout}
							key={1}
						/>
					);
				} else if (requestInfo.booksFailed) {
					content.push(
						<Alert color="danger" key={1}>
							Their was an error trying to access available books please try
							again later or contact and Admin
						</Alert>
					);
				}
			}
		} else if (borrowerDashboardInfo.isReturning) {
			content.push('return clicked!');
			if (requestInfo.loansPending) {
				content.push(<Spinner type="grow" color="primary" key={1} />);
			} else if (requestInfo.loansSuccessful) {
				content.push(
					<ReturnLoansTable
						handleReturn={handleReturn}
						loans={borrowerDashboardInfo.loans}
						key={1}
					/>
				);
				//Have Popup for return date if loan
				//
				//
				//
				//
			} else if (requestInfo.loansFailed) {
				content.push(
					<Alert color="danger" key={1}>
						Their was an error trying to access available books please try
						again later or contact and Admin
					</Alert>
				);
			}
		}
	}
	return (
		<div>
			<Header />
			<div className="jumbotron">
				<h1>Borrower Dashboard</h1>
			</div>
			{content}
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
	borrower: PropTypes.object,
	borrowerDashboardInfo: PropTypes.object,
	requestInfo: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(BorrowerContainer);
