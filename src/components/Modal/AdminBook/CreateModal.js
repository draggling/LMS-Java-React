import React, { useState } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	FormFeedback,
	Label,
	Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { UncontrolledAlert } from 'reactstrap';

const CreateModal = (props) => {
	const {
		buttonLabel,
		handleCreate,
		publishers,
		authors,
		genres,
	} = props;
	/* constant state values */
	const [validData, alertMessage] = useState("");
	const [titleCheck, checkTitle] = useState("");
	const [publisherCheck, checkPublisher] = useState(null);
	const [authorsCheck, checkAuthors] = useState([]);
	const [genresCheck, checkGenres] = useState([]);

	/* temporary state values */
	let newBookName = titleCheck;
	let newPub = publisherCheck;
	let newPubId = 0;
	if(publisherCheck !== null) {
		newPubId = publisherCheck.publisherId;
	}
	let authorKeys = authorsCheck;
	let genreKeys = genresCheck;
	console.log("START");
	console.log(titleCheck);
	function resetData() {
		alertMessage("");
		checkTitle('');
		checkPublisher(null);
		checkAuthors([]);
		checkGenres([]);
	}
	function checkData() {
		(newBookName.length > 0 && newBookName.length < 45)
		?	checkTitle(newBookName)
		:	checkTitle(false);
		(newPubId > 0)
		?	checkPublisher(newPub)
		:	checkPublisher(false);
		(authorKeys.length > 0)
		?	checkAuthors(authorKeys)
		:	checkAuthors(false);
		(genreKeys.length > 0)
		?	checkGenres(genreKeys)
		:	checkGenres(false);
	}
	function createBook() {
		checkData();
		if (newBookName.length > 0 && newBookName.length < 45
		&& newPubId > 0 && authorKeys.length > 0 && genreKeys.length > 0)
			{
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
			alertMessage("");
			handleCreate(newBookName, newPub, newAuthors, newGenres);
			toggle();
		} else {
			alertMessage(
				<div>
					<UncontrolledAlert color="warning">
						ERROR: Invalid Input!
					</UncontrolledAlert>
				</div>
			);
		}
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
	const toggle = () => {
		setModal(!modal);
		resetData();
	}
	console.log("name : ");
	console.log(newBookName);
	console.log("titleCheck : ");
	console.log(titleCheck);
	console.log("authorsCheck : ");
	console.log(authorsCheck);
	return (
		<div>
			<Button color="primary" onClick={toggle}>
				{buttonLabel}
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Create Book</ModalHeader>
				<ModalBody>
					{validData}
					<Form>
						<FormGroup>
							<Label form="formBookName"> Book Name </Label>
							{titleCheck !== false && titleCheck == ''  &&
								<Input
									type="text"
									id="formBookName"
									minLength={1}
									maxLength={45}
									name="title"
									onChange={handleNameChange}
									placeholder="New Book Name"
									required
							/>
							}
							{titleCheck && titleCheck != '' &&
								<Input
									type="text"
									id="formBookName"
									minLength={1}
									maxLength={45}
									name="title"
									onChange={handleNameChange}
									defaultValue={titleCheck}
									required
							/>
							}
							{titleCheck === false &&
								<React.Fragment>
									<Input
										type="text"
										id="formBookNameInvalid"
										minLength={1}
										maxLength={45}
										name="title"
										onChange={handleNameChange}
										placeholder="New Book Name"
										required
										invalid
									/>
									<FormFeedback> Invalid Book Title </FormFeedback>
								</React.Fragment>
							}
						</FormGroup>
						<FormGroup>
							<Label form="formPublisher"> Book Publisher </Label>
							{publisherCheck !== false && publisherCheck == null &&
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
							}
							{publisherCheck !== false && publisherCheck !== null &&
								<React.Fragment>
								<Input
									type="select"
									id="formPublisher"
									name="publisher"
									onChange={handlePublisherChange}
									defaultValue={newPubId}
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
								</React.Fragment>
							}
							{publisherCheck === false &&
								<React.Fragment>
								<Input
									type="select"
									id="formPublisher"
									name="publisher"
									onChange={handlePublisherChange}
									invalid
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
								<FormFeedback> Publisher Required </FormFeedback>
								</React.Fragment>
							}
						</FormGroup>
						<FormGroup>
							<Label form="formAuthors"> Authors (select at least 1)</Label>
							{authorsCheck.length == 0 && authorKeys.length == 0 &&
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
							}
							{authorsCheck.length > 0  &&
							<Input
								type="select"
								id="formAuthor"
								multiple
								name="author"
								defaultValue = {authorsCheck}
								onChange={handleAuthorsChange}
							>
								{authors.map((author) => (
									<option key={author.authorId} value={author.authorId}>
										{author.authorName}
									</option>
								))}
							</Input>
							}
							{!authorsCheck &&
							<React.Fragment>
							<Input
								type="select"
								id="formAuthor"
								multiple
								name="author"
								onChange={handleAuthorsChange}
								invalid
							>
								{authors.map((author) => (
									<option key={author.authorId} value={author.authorId}>
										{author.authorName}
									</option>
								))}
							</Input>
							<FormFeedback> At Least 1 Author Required </FormFeedback>
							</React.Fragment>
							}
						</FormGroup>
						<FormGroup>
							<Label form="formGenres"> Genres (select at least 1)</Label>
							{genresCheck.length == 0 && genreKeys.length == 0 &&
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
							}
							{genresCheck.length > 0 &&
							<Input
								type="select"
								id="formGenre"
								multiple
								name="genre"
								defaultValue = {genresCheck}
								onChange={handleGenresChange}
							>
								{genres.map((genre) => (
									<option key={genre.genreId} value={genre.genreId}>
										{genre.genreName}
									</option>
								))}
							</Input>
							}
							{!genresCheck &&
								<React.Fragment>
								<Input
									type="select"
									id="formGenre"
									multiple
									name="genre"
									onChange={handleGenresChange}
									invalid
									>
									{genres.map((genre) => (
										<option key={genre.genreId} value={genre.genreId}>
											{genre.genreName}
										</option>
									))}
									</Input>
									<FormFeedback> At Least 1 Genre Required </FormFeedback>
								</React.Fragment>
							}
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
	handleCreate: PropTypes.func,
};

export default CreateModal;
