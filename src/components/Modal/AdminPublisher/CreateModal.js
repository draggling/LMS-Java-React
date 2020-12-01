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
	const { buttonLabel, handleCreate } = props;
	let newPublisherName = '';
	let newPublisherAddress = '';
	let newPublisherPhone = '';

	function createPublisher(newPublisherName, newPublisherAddress, newPublisherPhone) {
		handleCreate(newPublisherName, newPublisherAddress, newPublisherPhone);
		toggle(); //need to figure out how to make create button be unpressed
	}

	function handleNameChange(e) {
		newPublisherName = e.target.value;
	}
	function handleAddressChange(e) {
		newPublisherAddress = e.target.value;
	}
	function handlePhoneChange(e) {
		newPublisherPhone = e.target.value;
	}

	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	return (
		<div>
			<Button color="primary" onClick={toggle}>
				{buttonLabel}
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Create Publisher</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="formPublisherName"> Publisher Name</Label>
							<Input
								type="text"
								id="formPublisherName"
								maxLength={45}
								name="branchName"
								onChange={handleNameChange}
								placeholder="New Publisher Name"
							/>
						</FormGroup>

						<FormGroup>
							<Label for="formPublisherAddress">Address</Label>
							<Input
								type="text"
								id="formPublisherAddress"
								maxLength={45}
								name="branchAddress"
								onChange={handleAddressChange}
								placeholder="New Address"
							/>
						</FormGroup>

						<FormGroup>
							<Label for="formPublisherPhone">Phone</Label>
							<Input
								type="text"
								id="formPublisherPhone"
								maxLength={45}
								name="branchPhone"
								onChange={handlePhoneChange}
								placeholder="New Phone Number"
							/>
						</FormGroup>
					</Form>
					<Button
						color="primary"
						className="twobuttons"
						onClick={() => {
							createPublisher(
								newPublisherName,
								newPublisherAddress,
								newPublisherPhone
							);
						}}
					>
						Create
					</Button>
					<Button color="danger" className="twobuttons" onClick={toggle}>
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
