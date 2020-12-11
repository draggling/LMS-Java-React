'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'reactstrap';

const BorrowerFunctionChanger = (props) => {
	const {
		borrowerName,
		handleLogout,
		isCheckingOut,
		isReturning,
		startCheckout,
		startReturn,
	} = props;
	return (
		<Row>
			<Col xs={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
				<h3>Welcome, {borrowerName}</h3>
				<br></br>
				<Button
					color={isCheckingOut ? 'primary' : 'info'}
					onClick={startCheckout}
				>
					Check-out
				</Button>
				&nbsp;&nbsp;
				<Button color={isReturning ? 'primary' : 'info'} onClick={startReturn}>
					Return
				</Button>
				<Button className="btn-right" onClick={handleLogout}>
					Logout
				</Button>
			</Col>
		</Row>
	);
};

BorrowerFunctionChanger.propTypes = {
	borrowerName: PropTypes.string,
	handleLogout: PropTypes.func,
	isCheckingOut: PropTypes.bool,
	isReturning: PropTypes.bool,
	startCheckout: PropTypes.func,
	startReturn: PropTypes.func,
};

export default BorrowerFunctionChanger;
