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
		handleRefresh,
		handleUpdate,
		currentBorrowerName,
		currentBorrowerAddress,
		currentBorrowerPhone,
		cardNo,
	} = props;
	let newBorrowerName = currentBorrowerName;
	let newBorrowerAddress = currentBorrowerAddress;
	let newBorrowerPhone = currentBorrowerPhone;

	function updateBorrower(cardNo, newBorrowerName, newBorrowerAddress, newBorrowerPhone) {
		handleUpdate(cardNo, newBorrowerName, newBorrowerAddress, newBorrowerPhone);
		//handleRefresh(); //Causes the weird update issue where the borrowerData contains only requestPending because books is being loaded again
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
								name="borrowerName"
								cardNo="formBorrowerName"
								defaultValue={currentBorrowerName}
								onChange={handleNameChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label for="formBorrowerAddress">BorrowerAddress</Label>
							<Input
								type="text"
								name="borrowerAddress"
								cardNo="formBorrowerAddress"
								defaultValue={currentBorrowerAddress}
								onChange={handleAddressChange}
							/>
						</FormGroup>
						
						<FormGroup>
							<Label for="formBorrowerPhone">BorrowerPhoneNumber</Label>
							<Input
								type="text"
								name="borrowerPhone"
								cardNo="formBorrowerPhone"
								defaultValue={currentBorrowerPhone}
								onChange={handlePhoneChange}
							/>
						</FormGroup>

					</Form>
					<Button
						color="primary"
						className="twobuttons"
						onClick={() => {
							updateBorrower(cardNo, newBorrowerName, newBorrowerAddress, newBorrowerPhone);
						}}
					>
						Update
					</Button>
					<Button
						color="danger"
						className="twobuttons"
						onClick={() => handleRefresh()}
					>
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
