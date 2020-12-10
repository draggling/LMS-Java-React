'use strict';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { formatDate } from '../../helpers/dateHelpers';

const ReturnConfirmationModal = ({ handleClose, newestReturn }) => {
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
				<h4>Book Return: </h4>
				<p>{newestReturn.book.title}</p>
				<h4>Branch: </h4>
				<p>{newestReturn.branch.branchName}</p>
				<h4>Return date: </h4>
				<p>{formatDate(newestReturn.dateIn)}</p>
				<Button color="secondary" className="btn-right" onClick={toggle}>
					Close
				</Button>
			</ModalBody>
		</Modal>
	);
};

ReturnConfirmationModal.propTypes = {
	handleClose: PropTypes.func,
	newestReturn: PropTypes.object,
};

export default ReturnConfirmationModal;
