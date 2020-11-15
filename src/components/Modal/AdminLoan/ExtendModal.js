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

const ExtendModal = (props) => {
	const {
		buttonLabel,
        dueDate,
		handleExtend,
		bookKey,
		branchKey,
		cardKey,
	} = props;
	let newDueDate = dueDate;


	function extendLoan(
		bookKey,
		branchKey,
		cardKey,
		newDueDate,
	) {
		handleExtend(
			bookKey,
			branchKey,
			cardKey,
			newDueDate,
		);
		toggle();
	}

	function handleExtendChange(e) {
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
									format = 'yyyy-mm-dd'
									minDate = {new Date()}
									defaultValue = {dueDate}
									showtodaybutton = {true}
									onChange={handleExtendChange}
								/>
						</FormGroup>
					</Form>

					<Button
						color="primary"
						className="twobuttons"
						onClick={() => {
							extendLoan(
								bookKey,
								branchKey,
								cardKey,
								newDueDate,
							);
						}}
					>
						Extend
					</Button>
					<Button
						color="danger"
						className="twobuttons"
						onClick={() => toggle()}
					>
						Cancel
					</Button>
				</ModalBody>
			</Modal>
		</div>
	);
};

ExtendModal.propTypes = {
	buttonLabel: PropTypes.string,
	handleRefresh: PropTypes.func,
	handleExtend: PropTypes.func,
	dueDate: PropTypes.string,
	bookKey: PropTypes.number,
	branchKey: PropTypes.number,
	cardKey: PropTypes.number,
};

export default ExtendModal;
