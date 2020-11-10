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

	function createPublisher(
		newPublisherName,
		newPublisherAddress,
		newPublisherPhone
	) {
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
							<Label for="formPublisherName">
								{' '}
								Publisher Name
							</Label>
							<Input
								type="text"
								name="branchName"
								id="formPublisherName"
								placeholder="New Publisher Name"
								onChange={handleNameChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label for="formPublisherAddress">Address</Label>
							<Input
								type="text"
								name="branchAddress"
								id="formPublisherAddress"
								placeholder="New Address"
								onChange={handleAddressChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label for="formPublisherPhone">Phone</Label>
							<Input
								type="text"
								name="branchPhone"
								id="formPublisherPhone"
								placeholder="New Phone Number"
								onChange={handlePhoneChange}
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
					<Button
						color="danger"
						className="twobuttons"
						onClick={toggle}
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
