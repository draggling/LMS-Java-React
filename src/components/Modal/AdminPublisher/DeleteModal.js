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
		currentPublisherName,
		currentPublisherAddress,
		currentPublisherPhone,
		handleDelete,
		handleRefresh,
		id,
	} = props;

	const [modal, setModal] = useState(false);

	function deletePublisher(id) {
		handleDelete(id);
		//handleRefresh();
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
					Are you sure you want to delete the publisher?
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="publisherName">Name:</Label>
							<Input plaintext value={currentPublisherName} />
						</FormGroup>
						<FormGroup>
							<Label for="publisherAddress">Address:</Label>
							<Input plaintext value={currentPublisherAddress} />
						</FormGroup>
						<FormGroup>
							<Label for="publisherPhone">Phone Number:</Label>
							<Input plaintext value={currentPublisherPhone} />
						</FormGroup>
						<Button
							color="primary"
							className="twobuttons"
							onClick={() => {
								deletePublisher(id);
							}}
						>
							Yes
						</Button>
						<Button
							color="danger"
							className="twobuttons"
							onClick={() => handleRefresh()}
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
	id: PropTypes.number,
	currentPublisherName: PropTypes.string,
	currentPublisherAddress: PropTypes.string,
	currentPublisherPhone: PropTypes.string,
};

export default DeleteModal;
