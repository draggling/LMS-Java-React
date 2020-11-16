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
		currentTitle,
		handleDelete,
		id,
	} = props;

	const [modal, setModal] = useState(false);

	function deleteBook(id) {
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
					Are you sure you want to delete the book?
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="title">Name:</Label>
							<Input plaintext value={currentTitle} />
						</FormGroup>
						<Button
							color="primary"
							className="twobuttons"
							onClick={() => {
								deleteBook(id);
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
	id: PropTypes.number,
	currentTitle: PropTypes.string,
};

export default DeleteModal;
