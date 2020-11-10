import React, { useState } from 'react';
import {
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalHeader,
	ModalBody,
} from 'reactstrap';
import PropTypes from 'prop-types';

const DeleteModal = (props) => {
	const {
		buttonLabel,
		cardNo,
		currentBorrowerAddress,
		currentBorrowerName,
		currentBorrowerPhone,
		handleDelete,
	} = props;

	const [modal, setModal] = useState(false);

	function deleteBorrower(cardNo) {
		handleDelete(cardNo);
		toggle();
	}

	const toggle = () => setModal(!modal);

	return (
		<div>
			<Button color="danger" onClick={toggle}>
				{buttonLabel}
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>
					Are you sure you want to delete the borrower?
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="borrowerName">Name:</Label>
							<Input
								plaintext
								defaultValue={currentBorrowerName}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="borrowerAddress">Address:</Label>
							<Input
								plaintext
								defaultValue={currentBorrowerAddress}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="borrowerAddress">Phone Number:</Label>
							<Input
								plaintext
								defaultValue={currentBorrowerPhone}
							/>
						</FormGroup>
						<Button
							color="primary"
							className="twobuttons"
							onClick={() => {
								deleteBorrower(cardNo);
							}}
						>
							Yes
						</Button>
						<Button
							color="danger"
							className="twobuttons"
							onClick={toggle}
						>
							No
						</Button>
					</Form>
				</ModalBody>
			</Modal>
		</div>
	);
};

DeleteModal.propTypes = {
	buttonLabel: PropTypes.string,
	handleDelete: PropTypes.func,
	handleRefresh: PropTypes.func,
	cardNo: PropTypes.number,
	currentBorrowerName: PropTypes.string,
	currentBorrowerAddress: PropTypes.string,
	currentBorrowerPhone: PropTypes.string,
};

export default DeleteModal;
