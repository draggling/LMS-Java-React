'use strict';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { connect } from 'react-redux';
import { Alert, Button, Col, Container, Row } from 'reactstrap';
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
	let spinner = Spinner(-1);
	if (!borrower) {
		if (!requestInfo) {
			content.push(
				<Row key={1}>
					<Col
						xs={{ size: 10, offset: 1 }}
						sm={{ size: 8, offset: 2 }}
						md={{ size: 6, offset: 3 }}
						lg={{ size: 4, offset: 4 }}
					>
						<BorrowerLoginForm handleLoginAttempt={handleLoginAttempt} />
					</Col>
				</Row>
			);
		} else if (requestInfo.loginPending) {
			content.push(spinner);
		} else if (requestInfo.loginFailed) {
			content.push(
				<Row key={1}>
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
						<BorrowerLoginForm handleLoginAttempt={handleLoginAttempt} />
					</Col>
				</Row>
			);
		}
	} else if (borrower && requestInfo.loginSuccessful) {
		content.push(
			//Make into its own component in the future
			<Row key={0}>
				<Col xs={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
					<h3>Welcome, {borrower.borrowerName}</h3>
					<br></br>
					<Button
						color={borrowerDashboardInfo.isCheckingOut ? 'primary' : 'info'}
						onClick={startCheckout}
					>
						Check-out
					</Button>
					&nbsp;&nbsp;
					<Button
						color={borrowerDashboardInfo.isReturning ? 'primary' : 'info'}
						onClick={startReturn}
					>
						Return
					</Button>
					<Button className="btn-right" onClick={handleLogout}>
						Logout
					</Button>
				</Col>
			</Row>
		);
		if (borrowerDashboardInfo.isCheckingOut) {
			if (!borrowerDashboardInfo.selectedBranch) {
				if (requestInfo.branchesPending) {
					content.push(spinner);
				} else if (requestInfo.branchesSuccessful) {
					content.push(
						<Row key={1}>
							<Col xs={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
								<br></br>
								<CheckoutBranchTable
									branches={borrowerDashboardInfo.branches}
									selectBranch={selectBranch}
								/>
							</Col>
						</Row>
					);
				} else if (requestInfo.branchesFailed) {
					content.push(
						<Row key={1}>
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
								key={2}
								handleClose={handleCloseCheckoutModal}
								newestLoan={borrowerDashboardInfo.newestLoan}
							/>
						);
					} else if (requestInfo.checkoutFailed) {
						console.log('checkout failed');
					}
					content.push(
						<Row key="b1">
							<Col xs={{ size: 4, offset: 1 }} lg={{ size: 3, offset: 2 }}>
								<br></br>
								<Button
									className="round-back-btn"
									onClick={goBackToBranchSelect}
								>
									<AiOutlineArrowLeft /> Branch Select
								</Button>
							</Col>
							<Col xs={{ size: 7, offset: 5 }} lg={{ size: 7, offset: 5 }}>
								<br></br>
							</Col>
						</Row>
					);
					content.push(
						<Row key={1}>
							<Col xs={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
								<CheckoutBookTable
									books={borrowerDashboardInfo.books}
									borrower={borrower}
									branch={borrowerDashboardInfo.selectedBranch}
									handleCheckout={handleCheckout}
									key={1}
								/>
							</Col>
						</Row>
					);
				} else if (requestInfo.booksFailed) {
					content.push(
						<Row key={1}>
							<Col xs={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
								<Alert color="danger" key={1}>
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
							key={2}
							handleClose={handleCloseReturnModal}
							newestReturn={borrowerDashboardInfo.updatedLoan}
						/>
					);
				} else if (requestInfo.returnFailed) {
					console.log('return failed');
				}
				content.push(
					<Row key={1}>
						<Col xs={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
							<br></br>
							<ReturnLoansTable
								handleReturn={handleReturn}
								loans={borrowerDashboardInfo.loans}
							/>
						</Col>
					</Row>
				);
			} else if (requestInfo.loansFailed) {
				content.push(
					<Row key={1}>
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
