'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const BorrowerLoginForm = (props) => {
	const { handleLoginAttempt } = props;
	let enteredCardNumber = -1;

	function handleCardNoChange(e) {
		enteredCardNumber = e.target.value;
	}
	function submitLoginAttempt() {
		handleLoginAttempt(enteredCardNumber);
	}
	return (
		<Row key={1}>
			<Col
				xs={{ size: 10, offset: 1 }}
				sm={{ size: 8, offset: 2 }}
				md={{ size: 6, offset: 3 }}
				lg={{ size: 4, offset: 4 }}
			>
				<Form className="borrower-login" onSubmit={submitLoginAttempt}>
					<h2 className="centered-text">Welcome to the Public Library!</h2>
					<br></br>
					<FormGroup>
						<Label for="formBorrowerCardNo">Card Number</Label>
						<Input
							type="number"
							name="borrowerCardNo"
							id="formBorrowerCardNo"
							placeholder="Enter your Library Card #"
							onChange={handleCardNoChange}
						/>
					</FormGroup>
					<Button className="btn-right" color="primary" size="lg">
						Login
					</Button>
				</Form>
			</Col>
		</Row>
	);
};

BorrowerLoginForm.propTypes = {
	handleLoginAttempt: PropTypes.func,
};

export default BorrowerLoginForm;
