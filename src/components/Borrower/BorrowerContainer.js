'use strict';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Col, Container, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';

import * as borrowerActions from '../../actions/borrowerActions';
import BorrowerFunctionChanger from './BorrowerFunctionChanger';
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
	let spinner = Spinner(-1);
	if (!borrower) {
		if (!requestInfo) {
			content.push(
				<BorrowerLoginForm key={1} handleLoginAttempt={handleLoginAttempt} />
			);
		} else if (requestInfo.loginPending) {
			content.push(spinner);
		} else if (requestInfo.loginFailed) {
			content.push(
				<Row key="a1">
					<Col
						xs={{ size: 10, offset: 1 }}
						sm={{ size: 8, offset: 2 }}
						md={{ size: 6, offset: 3 }}
						lg={{ size: 4, offset: 4 }}
					>
						<Alert color="danger">
							The entered card number does not exist in our system please
							try again or contact an administrator
						</Alert>
					</Col>
				</Row>,
				<BorrowerLoginForm key={1} handleLoginAttempt={handleLoginAttempt} />
			);
		}
	} else if (borrower && requestInfo.loginSuccessful) {
		content.push(
			//Make into its own component in the future
			<BorrowerFunctionChanger
				key={1}
				borrowerName={borrower.borrowerName}
				handleLogout={handleLogout}
				isCheckingOut={borrowerDashboardInfo.isCheckingOut}
				isReturning={borrowerDashboardInfo.isReturning}
				startCheckout={startCheckout}
				startReturn={startReturn}
			/>
		);
		if (borrowerDashboardInfo.isCheckingOut) {
			if (!borrowerDashboardInfo.selectedBranch) {
				if (requestInfo.branchesPending) {
					content.push(spinner);
				} else if (requestInfo.branchesSuccessful) {
					content.push(
						<CheckoutBranchTable
							key={2}
							branches={borrowerDashboardInfo.branches}
							selectBranch={selectBranch}
						/>
					);
				} else if (requestInfo.branchesFailed) {
					content.push(
						<Row key="a1">
							<Col xs={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
								<Alert color="danger">
									Their was an error trying to access library branches
									please try again later or contact and Admin
								</Alert>
							</Col>
						</Row>
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
								key={3}
								handleClose={handleCloseCheckoutModal}
								newestLoan={borrowerDashboardInfo.newestLoan}
							/>
						);
					} else if (requestInfo.checkoutFailed) {
						console.log('checkout failed');
					}
					content.push(
						<CheckoutBookTable
							key={2}
							books={borrowerDashboardInfo.books}
							borrower={borrower}
							branch={borrowerDashboardInfo.selectedBranch}
							goBackToBranchSelect={goBackToBranchSelect}
							handleCheckout={handleCheckout}
						/>
					);
				} else if (requestInfo.booksFailed) {
					content.push(
						<Row key="a1">
							<Col xs={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
								<Alert color="danger" key="a1">
									Their was an error trying to access available books
									please try again later or contact and Admin
								</Alert>
							</Col>
						</Row>
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
							key={3}
							handleClose={handleCloseReturnModal}
							newestReturn={borrowerDashboardInfo.updatedLoan}
						/>
					);
				} else if (requestInfo.returnFailed) {
					console.log('return failed');
				}
				content.push(
					<ReturnLoansTable
						key={2}
						handleReturn={handleReturn}
						loans={borrowerDashboardInfo.loans}
					/>
				);
			} else if (requestInfo.loansFailed) {
				content.push(
					<Row key="a1">
						<Col xs={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
							<Alert color="danger">
								Their was an error trying to access available books please
								try again later or contact and Admin
							</Alert>
						</Col>
					</Row>
				);
			}
		}
	}
	return (
		<Container fluid={true}>
			<BorrowerHeader />
			<Row className="jumbotron">
				<img width="65px" height="65px" src="../images/borrower.png" />
				<h1>&nbsp;&nbsp;Borrower Dashboard&nbsp;&nbsp;</h1>
				<img width="65px" height="65px" src="../images/borrower.png" />
			</Row>
			{content}
		</Container>
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
