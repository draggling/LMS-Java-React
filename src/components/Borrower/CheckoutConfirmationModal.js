'use strict';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { formatDate } from '../../helpers/dateHelpers';

const CheckoutConfirmationModal = ({ handleClose, newestLoan }) => {
	const [modal, setModal] = useState(true);
	const toggle = () => setModal(!modal);

	function handleModalClose() {
		handleClose();
		toggle();
	}
	return (
		<Modal isOpen={modal} onClosed={handleModalClose} toggle={toggle}>
			<ModalHeader>Checkout Successful!</ModalHeader>
			<ModalBody>
				<h4>Book Loaned: </h4>
				<p>{newestLoan.book.title}</p>
				<h4>Branch: </h4>
				<p>{newestLoan.branch.branchName}</p>
				<h4>Your Due Date is: </h4>
				<p>{formatDate(newestLoan.dueDate)}</p>
				<Button color="secondary" className="" onClick={toggle}>
					Close
				</Button>
			</ModalBody>
		</Modal>
	);
};

CheckoutConfirmationModal.propTypes = {
	handleClose: PropTypes.func,
	newestLoan: PropTypes.object,
};

export default CheckoutConfirmationModal;
