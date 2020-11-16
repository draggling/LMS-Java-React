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
	let newBookName = '';
	let newPubId = '';

	function createBook(newBookName, newPubId) {
		handleCreate(newBookName, newPubId);
		//handleRefresh();
		toggle(); //need to figure out how to make create button be unpressed
	}

	function handleNameChange(e) {
		newBookName = e.target.value;
	}
	function handlePublisherChange(e) {
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
				<ModalHeader toggle={toggle}>Create Book</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="formBookName"> Book Name</Label>
							<Input
								type="text"
								name="title"
								id="formBookName"
								placeholder="New Book Name"
								onChange={handleNameChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label for="formPubId">
								Book Publisher
							</Label>
							<Input
								type="text"
								name="pubId"
								id="formPubId"
								placeholder="New Publisher"
								onChange={handlePublisherChange}
							/>
						</FormGroup>
					</Form>
					<Button
						color="primary"
						className="twobuttons"
						onClick={() => {
							createBook(newBookName, newPubId);
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
