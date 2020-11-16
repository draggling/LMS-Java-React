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
		currentPubId,
		currentTitle,
		handleUpdate,
		id,
	} = props;
	let newTitle = currentTitle;
	let newPubId = currentPubId;

	function updateBook(id, newTitle, newPubId) {
		handleUpdate(id, newTitle, newPubId);
		//handleRefresh(); //Causes the weird update issue where the bookData contains only requestPending because books is being loaded again
		toggle(); //need to figure out how to make update button be unpressed
	}

	function handleNameChange(e) {
		newTitle = e.target.value;
	}
	function handleAddressChange(e) {
		newPubId = e.target.value;
	}

	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	return (
		<div>
			<Button color="primary" onClick={toggle}>
				{buttonLabel}
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Update Book</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="formTitle">Title</Label>
							<Input
								type="text"
								name="title"
								id="formTitle"
								defaultValue={currentTitle}
								onChange={handleNameChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label for="formPubId">PubId</Label>
							<Input
								type="text"
								name="bookAddress"
								id="formPubId"
								defaultValue={currentPubId}
								onChange={handleAddressChange}
							/>
						</FormGroup>
					</Form>
					<Button
						color="primary"
						className="twobuttons"
						onClick={() => {
							updateBook(id, newTitle, newPubId);
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
	currentTitle: PropTypes.string,
	currentPubId: PropTypes.string,
	id: PropTypes.number,
};

export default UpdateModal;
