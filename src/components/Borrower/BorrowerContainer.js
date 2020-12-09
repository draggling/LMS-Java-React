'use strict';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { connect } from 'react-redux';
import { Alert, Button } from 'reactstrap';
import { bindActionCreators } from 'redux';

import * as borrowerActions from '../../actions/borrowerActions';
import BorrowerLoginForm from './BorrowerLoginForm';
import CheckoutBranchTable from './CheckoutBranchTable';
import CheckoutBookTable from './CheckoutBookTable';
import CheckoutConfirmationModal from './CheckoutConfirmationModal';
import ReturnConfirmationModal from './ReturnConfirmationModal';
import ReturnLoansTable from './ReturnLoansTable';
import BorrowerHeader from './BorrowerHeader';
import Spinner from '../Util/Spinner';

const BorrowerContainer = (props) => {
	const { actions, borrower, borrowerDashboardInfo, requestInfo } = props;
	useEffect(() => {
		//actions.readBranches();
	}, []);
	let content = [];
	function goBackToBranchSelect() {
		actions.returnToBranchSelect();
	}
	function handleCheckout(book, borrower, branch) {
		actions.processCheckout(book, borrower, branch);
	}
	function handleCloseCheckoutModal() {
		actions.handleCloseCheckoutModal();
	}
	function handleCloseReturnModal() {
		actions.handleCloseReturnModal();
	}
	function handleLoginAttempt(cardNo) {
		actions.attemptLogin(cardNo);
	}
	function handleLogout() {
		actions.logoutBorrower();
	}
	function handleReturn(loan) {
		actions.processReturn(loan);
	}
	function selectBranch(branch) {
		actions.selectBranchForCheckout(branch, borrower.borrowerCardNo);
	}
	function startCheckout() {
		actions.startCheckout();
	}
	function startReturn() {
		actions.startReturn(borrower.borrowerCardNo);
	}
	console.log(requestInfo);
	let spinner = Spinner(-1);
	if (!borrower) {
		if (!requestInfo) {
			content.push(
				<BorrowerLoginForm handleLoginAttempt={handleLoginAttempt} key={1} />
			);
		} else if (requestInfo.loginPending) {
			content.push(spinner); //add Key
		} else if (requestInfo.loginFailed) {
			content.push(
				<div key={1}>
					<Alert color="danger">
						The entered card number does not exist in our system please try
						again or contact an administrator
					</Alert>
					<BorrowerLoginForm handleLoginAttempt={handleLoginAttempt} />
				</div>
			);
		}
	} else if (borrower && requestInfo.loginSuccessful) {
		content.push(
			//Make into its own component in the future
			<div key={0}>
				<h4>Welcome {borrower.borrowerName}</h4>
				<Button onClick={startCheckout}>Check-out</Button>
				<Button onClick={startReturn}>Return</Button>
				<Button onClick={handleLogout}>Logout</Button>
			</div>
		);
		if (borrowerDashboardInfo.isCheckingOut) {
			if (!borrowerDashboardInfo.selectedBranch) {
				if (requestInfo.branchesPending) {
					content.push(spinner); //add Key
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
					content.push(spinner);
				} else if (requestInfo.booksSuccessful) {
					if (requestInfo.checkoutPending) {
						console.log('checkout pending');
					} else if (requestInfo.checkoutSuccessful) {
						content.push(
							<CheckoutConfirmationModal
								key={2}
								handleClose={handleCloseCheckoutModal}
								newestLoan={borrowerDashboardInfo.newestLoan}
							/>
						);
					} else if (requestInfo.checkoutFailed) {
						console.log('checkout failed');
					}
					content.push(
						<Button
							key="b1"
							className="round-back-btn"
							onClick={goBackToBranchSelect}
						>
							<AiOutlineArrowLeft />
						</Button>
					);
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
			if (requestInfo.loansPending) {
				content.push(spinner);
			} else if (requestInfo.loansSuccessful) {
				if (requestInfo.returnPending) {
					console.log('return pending');
				} else if (requestInfo.returnSuccessful) {
					content.push(
						<ReturnConfirmationModal
							key={2}
							handleClose={handleCloseReturnModal}
							newestReturn={borrowerDashboardInfo.updatedLoan}
						/>
					);
				} else if (requestInfo.returnFailed) {
					console.log('return failed');
				}
				content.push(
					<ReturnLoansTable
						handleReturn={handleReturn}
						loans={borrowerDashboardInfo.loans}
						key={1}
					/>
				);
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
			<BorrowerHeader />
			<div className="jumbotron">
				<img width="65px" height="65px" src="../images/borrower.png" />
				<h1>&nbsp;&nbsp;Borrower Dashboard&nbsp;&nbsp;</h1>
				<img width="65px" height="65px" src="../images/borrower.png" />
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
