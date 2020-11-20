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
	const { authorId, buttonLabel, currentAuthorName, handleDelete } = props;

	const [modal, setModal] = useState(false);

	function deleteAuthor(authorId) {
		handleDelete(authorId);
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
					Are you sure you want to delete the author?
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="authorName">Name:</Label>
							<Input plaintext defaultValue={currentAuthorName} />
						</FormGroup>
						<Button
							color="primary"
							className="twobuttons"
							onClick={() => {
								deleteAuthor(authorId);
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
	authorId: PropTypes.number,
	currentAuthorName: PropTypes.string,
};

export default DeleteModal;
