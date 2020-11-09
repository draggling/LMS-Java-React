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
		currentPublisherName,
		currentPublisherAddress,
		currentPublisherPhone,
		handleUpdate,
		id,
	} = props;
	let newPublisherName = currentPublisherName;
	let newPublisherAddress = currentPublisherAddress;
	let newPublisherPhone = currentPublisherPhone;

	function updatePublisher(
		id,
		newPublisherName,
		newPublisherAddress,
		newPublisherPhone
	) {
		handleUpdate(
			id,
			newPublisherName,
			newPublisherAddress,
			newPublisherPhone
		);
		toggle(); //need to figure out how to make update button be unpressed
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
				<ModalHeader toggle={toggle}>Update Publisher</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="formPublisherName">
								Publisher Name
							</Label>
							<Input
								type="text"
								name="publisherName"
								id="formPublisherName"
								defaultValue={currentPublisherName}
								onChange={handleNameChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label for="formPublisherAddress">Address</Label>
							<Input
								type="text"
								name="publisherAddress"
								id="formPublisherAddress"
								defaultValue={currentPublisherAddress}
								onChange={handleAddressChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label for="formPublisherPhone">Phone Number</Label>
							<Input
								type="text"
								name="publisherPhone"
								id="formPublisherPhone"
								defaultValue={currentPublisherPhone}
								onChange={handlePhoneChange}
							/>
						</FormGroup>
					</Form>
					<Button
						color="primary"
						className="twobuttons"
						onClick={() => {
							updatePublisher(
								id,
								newPublisherName,
								newPublisherAddress,
								newPublisherPhone
							);
						}}
					>
						Update
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

UpdateModal.propTypes = {
	buttonLabel: PropTypes.string,
	handleRefresh: PropTypes.func,
	handleUpdate: PropTypes.func,
	currentPublisherName: PropTypes.string,
	currentPublisherAddress: PropTypes.string,
	currentPublisherPhone: PropTypes.string,
	id: PropTypes.number,
};

export default UpdateModal;
