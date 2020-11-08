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
		handleDelete,
		handleRefresh,
		id,
		currentBranchName,
		currentBranchAddress,
	} = props;

	const [modal, setModal] = useState(false);

	function deleteBranch(id) {
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
					Are you sure you want to delete the branch?
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="branchName">Name:</Label>
							<Input plaintext value={currentBranchName} />
						</FormGroup>
						<FormGroup>
							<Label for="branchAddress">Address:</Label>
							<Input plaintext value={currentBranchAddress} />
						</FormGroup>
						<Button
							color="primary"
							className="twobuttons"
							onClick={() => {
								deleteBranch(id);
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
	currentBranchName: PropTypes.string,
	currentBranchAddress: PropTypes.string,
};

export default DeleteModal;
