import React, { useState } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
} from 'reactstrap';
import PropTypes from 'prop-types';

const UpdateModal = (props) => {
	const {
		buttonLabel,
		cardNo,
		currentBorrowerAddress,
		currentBorrowerName,
		currentBorrowerPhone,
		handleUpdate,
	} = props;
	let newBorrowerName = currentBorrowerName;
	let newBorrowerAddress = currentBorrowerAddress;
	let newBorrowerPhone = currentBorrowerPhone;

	function updateBorrower(
		cardNo,
		newBorrowerName,
		newBorrowerAddress,
		newBorrowerPhone
	) {
		handleUpdate(cardNo, newBorrowerName, newBorrowerAddress, newBorrowerPhone);
		toggle(); //need to figure out how to make update button be unpressed
	}

	function handleNameChange(e) {
		newBorrowerName = e.target.value;
	}
	function handleAddressChange(e) {
		newBorrowerAddress = e.target.value;
	}
	function handlePhoneChange(e) {
		newBorrowerPhone = e.target.value;
	}

	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	return (
		<div>
			<Button color="primary" onClick={toggle}>
				{buttonLabel}
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Update Borrower</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="formBorrowerName">BorrowerName</Label>
							<Input
								type="text"
								cardNo="formBorrowerName"
								defaultValue={currentBorrowerName}
								maxLength={45}
								name="borrowerName"
								onChange={handleNameChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label for="formBorrowerAddress">BorrowerAddress</Label>
							<Input
								type="text"
								cardNo="formBorrowerAddress"
								defaultValue={currentBorrowerAddress}
								maxLength={45}
								name="borrowerAddress"
								onChange={handleAddressChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label for="formBorrowerPhone">BorrowerPhoneNumber</Label>
							<Input
								type="text"
								cardNo="formBorrowerPhone"
								defaultValue={currentBorrowerPhone}
								maxLength={45}
								name="borrowerPhone"
								onChange={handlePhoneChange}
							/>
						</FormGroup>
					</Form>
					<Button
						color="primary"
						className="twobuttons"
						onClick={() => {
							updateBorrower(
								cardNo,
								newBorrowerName,
								newBorrowerAddress,
								newBorrowerPhone
							);
						}}
					>
						Update
					</Button>
					<Button color="danger" className="twobuttons" onClick={toggle}>
						Cancel
					</Button>
				</ModalBody>
			</Modal>
		</div>
	);
};

UpdateModal.propTypes = {
	buttonLabel: PropTypes.string,
	handleRefresh: PropTypes.func,
	handleUpdate: PropTypes.func,
	currentBorrowerName: PropTypes.string,
	currentBorrowerAddress: PropTypes.string,
	currentBorrowerPhone: PropTypes.string,
	cardNo: PropTypes.number,
};

export default UpdateModal;
