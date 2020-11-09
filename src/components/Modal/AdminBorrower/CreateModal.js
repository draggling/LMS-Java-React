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

const CreateModal = (props) => {
	const { buttonLabel, handleRefresh, handleCreate } = props;
	let newBorrowerName = '';
	let newBorrowerAddress = '';
	let newBorrowerPhone = '';

	function createBorrower(newBorrowerName, newBorrowerAddress, newBorrowerPhone) {
		handleCreate(newBorrowerName, newBorrowerAddress, newBorrowerPhone);
		//handleRefresh();
		toggle(); //need to figure out how to make create button be unpressed
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
				<ModalHeader toggle={toggle}>Create Borrower</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="formBorrowerName"> Borrower Name</Label>
							<Input
								type="text"
								name="borrowerName"
								id="formBorrowerName"
								placeholder="New Borrower Name"
								onChange={handleNameChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label for="formBorrowerAddress">
								Borrower Address
							</Label>
							<Input
								type="text"
								name="borrowerAddress"
								id="formBorrowerAddress"
								placeholder="New Address"
								onChange={handleAddressChange}
							/>
						</FormGroup>
						
												<FormGroup>
							<Label for="formBorrowerPhone">
								Borrower Phone
							</Label>
							<Input
								type="text"
								name="borrowerPhone"
								id="formBorrowerPhone"
								placeholder="New Phone Number"
								onChange={handlePhoneChange}
							/>
						</FormGroup>
						
					</Form>
					<Button
						color="primary"
						className="twobuttons"
						onClick={() => {
							createBorrower(newBorrowerName, newBorrowerAddress, newBorrowerPhone);
						}}
					>
						Create
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

CreateModal.propTypes = {
	buttonLabel: PropTypes.string,
	handleRefresh: PropTypes.func,
	handleCreate: PropTypes.func,
};

export default CreateModal;
