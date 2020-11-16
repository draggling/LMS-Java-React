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
		bookId,
		branchId,
		cardNo,
	} = props;
	let difference = 0;

	function extendLoan( bookId,branchId,cardNo,difference) {
		console.log("pushing values");
		console.log("bookId = " + bookId);
		console.log("branchId = " + branchId);
		console.log("cardNo = " + cardNo);
		console.log("difference = " + difference);
		handleExtend(bookId, branchId, cardNo, difference);
		toggle();
	}

	function handleExtendChange(e) {
		let newDueDate = e.target.value;
		console.log("newDueDate = " + newDueDate);
		console.log("oldDueDate = " + dueDate);
		let date1 = new Date(newDueDate);
		let date2 = new Date(dueDate);
		difference = (date1.getTime() - date2.getTime()) / (1000 * 3600 * 24);
		difference = difference - difference % 1;
		console.log("difference = " + difference);
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
									mindate = {new Date()}
									defaultValue = {dueDate}
									showtodaybutton = 'true'
									onChange={handleExtendChange}
								/>
						</FormGroup>
					</Form>

					<Button
						color="primary"
						className="twobuttons"
						onClick={() => { extendLoan(bookId, branchId, cardNo, difference);
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
	cardNo: PropTypes.number,
	difference: PropTypes.number,
	bookId: PropTypes.number,
	branchId: PropTypes.number
};

export default ExtendModal;
