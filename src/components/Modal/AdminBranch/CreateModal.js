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
	let newBranchName = '';
	let newBranchAddress = '';

	function createBranch(newBranchName, newBranchAddress) {
		handleCreate(newBranchName, newBranchAddress);
		//handleRefresh();
		toggle(); //need to figure out how to make create button be unpressed
	}

	function handleNameChange(e) {
		newBranchName = e.target.value;
	}
	function handleAddressChange(e) {
		newBranchAddress = e.target.value;
	}

	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	return (
		<div>
			<Button color="primary" onClick={toggle}>
				{buttonLabel}
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Create Branch</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="formBranchName"> Branch Name</Label>
							<Input
								type="text"
								id="formBranchName"
								maxLength={45}
								name="branchName"
								onChange={handleNameChange}
								placeholder="New Branch Name"
							/>
						</FormGroup>

						<FormGroup>
							<Label for="formBranchAddress">Branch Address</Label>
							<Input
								type="text"
								id="formBranchAddress"
								maxLength={45}
								name="branchAddress"
								onChange={handleAddressChange}
								placeholder="New Address"
							/>
						</FormGroup>
					</Form>
					<Button
						color="primary"
						className="twobuttons"
						onClick={() => {
							createBranch(newBranchName, newBranchAddress);
						}}
					>
						Create
					</Button>
					<Button color="danger" className="twobuttons" onClick={toggle}>
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
