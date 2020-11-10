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
        dueDate,
		handleRefresh,
		handleUpdate,
		key,
	} = props;
	let newDueDate = dueDate;


	function updateLoan(
		key,
		newDueDate,
	) {
		handleUpdate(
			key,
			newDueDate,
		);
		toggle();
	}

	function handleDueDateChange(e) {
		newDueDate = e.target.value;
	}

	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	return (
		<div>
			<Button color="primary" onClick={toggle}>
				{buttonLabel}
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Extend Loan</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="formDueDate">Date</Label>
								<Input
									type="date"
									name="dueDate"
									key="formLoanDueDate"
									defaultValue={dueDate}
									onChange={handleDueDateChange}
								/>
						</FormGroup>
					</Form>

					<Button
						color="primary"
						className="twobuttons"
						onClick={() => {
							updateLoan(
								key,
								newDueDate,
							);
						}}
					>
						Update
					</Button>
					<Button
						color="danger"
						className="twobuttons"
						onClick={() => handleRefresh()}
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
	dueDate: PropTypes.instanceOf(Date),
	key: PropTypes.object,
};

export default UpdateModal;
