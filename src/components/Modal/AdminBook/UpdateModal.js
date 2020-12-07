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
	UncontrolledAlert,
} from 'reactstrap';
import PropTypes from 'prop-types';

const UpdateModal = (props) => {
	const {
		buttonLabel,
		currentTitle,
		currentPub,
		currentAuthors,
		currentGenres,
		handleUpdate,
		handleRefresh,
		publishers,
		authors,
		genres,
		bookId,
	} = props;
	let newPubId = currentPub.publisherId;
	let newBookName = currentTitle;
	let newPub = currentPub;
	let authorKeys = [];
	for (let i = 0; i < currentAuthors.length; i++) {
		authorKeys.push(currentAuthors[i].authorId.toString());
	}
	let genreKeys = [];
	for (let i = 0; i < currentGenres.length; i++) {
		genreKeys.push(currentGenres[i].genreId.toString());
	}

	let alertMessage = alertMessage || '';

	function updateBook() {
		if (
			newBookName !== '' &&
			newPubId > 0 &&
			authorKeys.length > 0 &&
			genreKeys.length > 0
		) {
			/* push author objects into newAuthors variable */
			let newAuthors = [];
			for (let i = 0; i < authors.length; i++) {
				if (authorKeys.includes(authors[i].authorId.toString())) {
					newAuthors.push(authors[i]);
				}
			}
			/* push genre objects into newGenres variable */
			let newGenres = [];
			for (let i = 0; i < genres.length; i++) {
				if (genreKeys.includes(genres[i].genreId.toString())) {
					newGenres.push(genres[i]);
				}
			}
			alertMessage = ""
			handleUpdate(bookId, newBookName, newPub, newAuthors, newGenres);
			toggle();
		} else {
			alertMessage = (
				<div>
					<UncontrolledAlert color="warning">
						ERROR: Invalid Input!
					</UncontrolledAlert>
				</div>
			);
			handleRefresh();
		}
	}

	function handleNameChange(e) {
		if (!e.target.value || e.target.value.length > 45) {
			alertMessage = (
				<div>
					<UncontrolledAlert color="warning">
						ERROR: Invalid Book Title!
					</UncontrolledAlert>
				</div>
			);
		} else {
			newBookName = e.target.value;
		}
	}
	function handlePublisherChange(e) {
		if (e.target.value > 0) {
			newPubId = e.target.value;
			for (const publisher of publishers) {
				if (publisher.publisherId == newPubId) {
					newPub = publisher;
				}
			}
		} else {
			console.log('ERROR');
		}
	}

	function handleAuthorsChange(e) {
		authorKeys = [];
		let author = '';
		let length = e.target.options.length;
		for (let i = 0; i < length; i++) {
			author = e.target.options[i];
			if (author.selected) {
				authorKeys.push(author.value);
			}
		}
	}

	function handleGenresChange(e) {
		genreKeys = [];
		let genre = '';
		let length = e.target.options.length;
		for (let i = 0; i < length; i++) {
			genre = e.target.options[i];
			if (genre.selected) {
				genreKeys.push(genre.value);
			}
		}
	}

	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	return (
		<div>
			<Button color="primary" onClick={toggle}>
				{buttonLabel}
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Create Book</ModalHeader>
				<ModalBody>
					{alertMessage}
					<Form>
						<FormGroup>
							<Label form="formBookName"> Book Name </Label>
							<Input
								type="text"
								defaultValue={currentTitle}
								id="formBookName"
								maxLength={45}
								name="title"
								onChange={handleNameChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label form="formPublisher"> Book Publisher </Label>
							<Input
								type="select"
								defaultValue={newPubId.toString()}
								id="formPublisher"
								name="publisher"
								onChange={handlePublisherChange}
								placeholder="New Publisher"
							>
								{publishers.map((publisher) => (
									<option
										key={publisher.publisherId}
										value={publisher.publisherId}
									>
										{publisher.publisherName +
											', ' +
											publisher.publisherAddress}
									</option>
								))}
							</Input>
						</FormGroup>
						<FormGroup>
							<Label form="formAuthors"> Authors (select at least 1)</Label>
							<Input
								type="select"
								defaultValue={authorKeys}
								id="formAuthor"
								multiple
								name="author"
								onChange={handleAuthorsChange}
							>
								{authors.map((author) => (
									<option key={author.authorId} value={author.authorId}>
										{author.authorName}
									</option>
								))}
							</Input>
						</FormGroup>
						<FormGroup>
							<Label form="formGenres"> Genres (select at least 1)</Label>
							<Input
								type="select"
								defaultValue={genreKeys}
								id="formGenre"
								multiple
								name="genre"
								onChange={handleGenresChange}
							>
								{genres.map((genre) => (
									<option key={genre.genreId} value={genre.genreId}>
										{genre.genreName}
									</option>
								))}
							</Input>
						</FormGroup>
					</Form>
					<Button color="primary" className="twobuttons" onClick={updateBook}>
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

UpdateModal.propTypes = {
	publishers: PropTypes.array,
	authors: PropTypes.array,
	genres: PropTypes.array,
	buttonLabel: PropTypes.string,
	handleRefresh: PropTypes.func,
	handleUpdate: PropTypes.func,
	currentTitle: PropTypes.string,
	currentPub: PropTypes.object,
	currentAuthors: PropTypes.array,
	currentGenres: PropTypes.array,
	bookId: PropTypes.number,
};

export default UpdateModal;
