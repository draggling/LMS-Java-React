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
import { UncontrolledAlert } from 'reactstrap';

const CreateModal = (props) => {
	const {
		buttonLabel,
		handleCreate,
		handleRefresh,
		publishers,
		authors,
		genres,
	} = props;
	/* deprecated alerts */
	if (!alert) {
		let alert = '';
	}
	let newBookName = '';
	let newPubId = 0;
	let newPub = '';
	let authorKeys = [];
	let genreKeys = [];
	function createBook() {
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
			handleCreate(newBookName, newPub, newAuthors, newGenres);
			toggle();
		} else {
			alert = (
				<div>
					<UncontrolledAlert color="warning">
						ERROR: Invalid Input!
					</UncontrolledAlert>
				</div>
			);
			handleRefresh();
		}
		//handleRefresh();
	}

	function handleNameChange(e) {
		newBookName = e.target.value;
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
					{alert}
					<Form>
						<FormGroup>
							<Label form="formBookName"> Book Name </Label>
							<Input
								type="text"
								id="formBookName"
								maxLength={45}
								name="title"
								onChange={handleNameChange}
								placeholder="New Book Name"
							/>
						</FormGroup>
						<FormGroup>
							<Label form="formPublisher"> Book Publisher </Label>
							<Input
								type="select"
								id="formPublisher"
								name="publisher"
								onChange={handlePublisherChange}
								placeholder="New Publisher"
							>
								<option key={0} value={0} unselectable="on">
									SELECT
								</option>
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
					<Button color="primary" className="twobuttons" onClick={createBook}>
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
	publishers: PropTypes.array,
	authors: PropTypes.array,
	genres: PropTypes.array,
	buttonLabel: PropTypes.string,
	handleRefresh: PropTypes.func,
	handleCreate: PropTypes.func,
};

export default CreateModal;
