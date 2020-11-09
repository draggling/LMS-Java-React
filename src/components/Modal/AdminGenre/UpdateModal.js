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
		currentGenreName,
		handleRefresh,
		handleUpdate,
        genreId,
	} = props;
	let newGenreName = currentGenreName;

	function updateGenre(
		genreId,
		newGenreName,
	) {
		handleUpdate(
			genreId,
			newGenreName,
		);
		//handleRefresh(); //Causes the weird update issue where the genreData contains only requestPending because books is being loaded again
		toggle(); //need to figure out how to make update button be unpressed
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
				<ModalHeader toggle={toggle}>Update Genre</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="formGenreName">
								Genre Name
							</Label>
							<Input
								type="text"
								name="genreName"
								genreId="formGenreName"
								defaultValue={currentGenreName}
								onChange={handleNameChange}
							/>
						</FormGroup>

					</Form>
					<Button
						color="primary"
						className="twobuttons"
						onClick={() => {
							updateGenre(
								genreId,
								newGenreName,
							);
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
	currentGenreName: PropTypes.string,
	genreId: PropTypes.number,
};

export default UpdateModal;
