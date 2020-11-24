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
		currentBranchAddress,
		currentBranchName,
		handleUpdate,
		id,
	} = props;
	let newBranchName = currentBranchName;
	let newBranchAddress = currentBranchAddress;

	function updateBranch(id, newBranchName, newBranchAddress) {
		handleUpdate(id, newBranchName, newBranchAddress);
		//handleRefresh(); //Causes the weird update issue where the branchData contains only requestPending because books is being loaded again
		toggle(); //need to figure out how to make update button be unpressed
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
				<ModalHeader toggle={toggle}>Update Branch</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="formBranchName">BranchName</Label>
							<Input
								type="text"
								name="branchName"
								id="formBranchName"
								defaultValue={currentBranchName}
								onChange={handleNameChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label for="formBranchAddress">BranchAddress</Label>
							<Input
								type="text"
								name="branchAddress"
								id="formBranchAddress"
								defaultValue={currentBranchAddress}
								onChange={handleAddressChange}
							/>
						</FormGroup>
					</Form>
					<Button
						color="primary"
						className="twobuttons"
						onClick={() => {
							updateBranch(id, newBranchName, newBranchAddress);
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
	currentBranchName: PropTypes.string,
	currentBranchAddress: PropTypes.string,
	id: PropTypes.number,
};

export default UpdateModal;
