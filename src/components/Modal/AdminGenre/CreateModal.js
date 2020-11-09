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
	let newGenreName = '';

	function createGenre(newGenreName) {
		handleCreate(newGenreName);
		toggle(); //need to figure out how to make create button be unpressed
	}

	function handleNameChange(e) {
		newGenreName = e.target.value;
	}

	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	return (
		<div>
			<Button color="primary" onClick={toggle}>
				{buttonLabel}
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Create Genre</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="formGenreName"> Genre Name</Label>
							<Input
								type="text"
								name="genreName"
								id="formGenreName"
								placeholder="New Genre Name"
								onChange={handleNameChange}
							/>
						</FormGroup>
						
					</Form>
					<Button
						color="primary"
						className="twobuttons"
						onClick={() => {
							createGenre(newGenreName);
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
