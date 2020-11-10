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
		currentGenreName,
		handleDelete,
		genreId,
	} = props;

	const [modal, setModal] = useState(false);

	function deleteGenre(genreId) {
		handleDelete(genreId);
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
					Are you sure you want to delete the genre?
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="genreName">Name:</Label>
							<Input plaintext defaultValue={currentGenreName} />
						</FormGroup>
						<Button
							color="primary"
							className="twobuttons"
							onClick={() => {
								deleteGenre(genreId);
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
	genreId: PropTypes.number,
	currentGenreName: PropTypes.string,
};

export default DeleteModal;
