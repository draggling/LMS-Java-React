'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

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
		<Form className="mainblock" onSubmit={submitLoginAttempt}>
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
			<Button>Submit</Button>
		</Form>
	);
};

BorrowerLoginForm.propTypes = {
	handleLoginAttempt: PropTypes.func,
};

export default BorrowerLoginForm;
