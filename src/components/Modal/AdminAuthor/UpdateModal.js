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
	const { authorId, buttonLabel, currentAuthorName, handleUpdate } = props;
	let newAuthorName = currentAuthorName;

	function updateAuthor(authorId, newAuthorName) {
		handleUpdate(authorId, newAuthorName);
		//handleRefresh(); //Causes the weird update issue where the authorData contains only requestPending because books is being loaded again
		toggle(); //need to figure out how to make update button be unpressed
	}

	function handleNameChange(e) {
		newAuthorName = e.target.value;
	}

	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	return (
		<div>
			<Button color="primary" onClick={toggle}>
				{buttonLabel}
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Update Author</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="formAuthorName">Author Name</Label>
							<Input
								type="text"
								authorId="formAuthorName"
								defaultValue={currentAuthorName}
								maxLength={45}
								name="authorName"
								onChange={handleNameChange}
							/>
						</FormGroup>
					</Form>
					<Button
						color="primary"
						className="twobuttons"
						onClick={() => {
							updateAuthor(authorId, newAuthorName);
						}}
					>
						Update
					</Button>
					<Button color="danger" className="twobuttons" onClick={toggle}>
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
	currentAuthorName: PropTypes.string,
	authorId: PropTypes.number,
};

export default UpdateModal;
