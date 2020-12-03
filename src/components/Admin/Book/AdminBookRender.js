import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import DeleteModal from '../../Modal/AdminBook/DeleteModal';
import UpdateModal from '../../Modal/AdminBook/UpdateModal';
import CreateModal from '../../Modal/AdminBook/CreateModal';

const AdminBookRender = ({
	bookData,
	publisherData,
	authorData,
	genreData,
	handleRefresh,
	handleDelete,
	handleUpdate,
	handleCreate,
	requestInfo,
}) => {
	let content = '';
	if (!bookData || requestInfo.readPending || requestInfo.readPublisherPending 
		|| requestInfo.readAuthorPending || requestInfo.readGenrePending) {
		content = (
			<div className="d-flex justify-content-center">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	}
	if (bookData && requestInfo.readSuccessful && requestInfo.readPublisherSuccessful
		&& requestInfo.readAuthorSuccessful && requestInfo.readGenreSuccessful) {
		/*
		console.log("Book Data");
		console.log(bookData);
		console.log("Publisher Data");
		console.log(publisherData);
		console.log("Author Data");
		console.log(authorData);
		console.log("Genre Data");
		console.log(genreData);
		console.log("requestInfo:");
		console.log(requestInfo);
		*/
		let data = {
			columns: [
				/*
				{
					label: 'Book Id',
					field: 'bookId',
					sort: 'asc',
				},
				*/
				{
					label: 'Book Name',
					field: 'title',
					sort: 'asc',
                },
                {
                    label: 'Publisher',
                    field: 'publisherName',
                },
                {
                    label: 'Authors',
                    field: 'authorInfo',
                    sort: 'asc',
                },
                {
                    label: 'Genres',
                    field: 'genreInfo',
                    sort: 'asc',
                },
				{
					label: 'Update',
					field: 'update',
					sort: 'asc',
				},
				{
					label: 'Delete',
					field: 'delete',
					sort: 'asc',
				},
			],
			rows: getTableBodyContent(),
		};
		return (
			<React.Fragment>
				<div className="mainblock">
					<CreateModal
						buttonLabel="Create New Book"
						publishers = {publisherData}
						authors = {authorData}
						genres = {genreData}
						handleCreate={handleCreate}
						handleRefresh={handleRefresh}
					/>
					<Button onClick={() => handleRefresh()}>
						Refresh Data
					</Button>{' '}
					<MDBDataTable
						striped
						bordered
						small
						responsive
						data={data}
					/>
				</div>
			</React.Fragment>
		);
	}

	if (bookData && requestInfo.readFailed) {
		content = (
			<div className="alert alert-danger" role="alert">
				Error while loading books!
			</div>
		);
    }
    function parsePublisherInfo(newObj) {
		if(!newObj.publisher) {
			return "Null pubisher";
		} else {
			return newObj.publisher.publisherName;
		}
    }

	function parseAuthors(newObj) {
		if(!newObj.authors || newObj.authors.length === 0) {
			return "\nNo Authors"
		} else {
			let authors =  "";
			for(let i = 0; i < newObj.authors.length; i++) {
				authors = authors.concat(newObj.authors[i].authorName);
				if(i < newObj.authors.length - 1) {
					authors = authors.concat(", ");
				}
			}
			return authors;
		}
    }
    
	function parseGenres(newObj) {
		if(!newObj.genres || newObj.genres.length === 0) {
			return "\nNo Genres"
		} else {
			let genres =  "";
			for(let i = 0; i < newObj.genres.length; i++) {
				genres = genres.concat(newObj.genres[i].genreName);
				if(i < newObj.genres.length - 1) {
					genres = genres.concat(", ");
				}
			}
			return genres;
		}
    }

	function getTableBodyContent() {
		return bookData.books.map((obj) => {
			let newObj = JSON.parse(JSON.stringify(obj));

            newObj.publisherName = parsePublisherInfo(newObj);
            newObj.authorInfo = parseAuthors(newObj);
            newObj.genreInfo = parseGenres(newObj);
			newObj.update = (
				<div>
					<UpdateModal
						buttonLabel="Update"
						handleUpdate={handleUpdate}
						handleRefresh={handleRefresh}
						bookId={newObj.bookId}
						currentPub={newObj.publisher}
						currentAuthors={newObj.authors}
						currentGenres={newObj.genres}
						currentTitle={newObj.title}
						publishers = {publisherData}
						authors = {authorData}
						genres = {genreData}
					/>
				</div>
			);

			newObj.delete = (
				<div>
					<DeleteModal
						buttonLabel="Delete"
						handleDelete={handleDelete}
						handleRefresh={handleRefresh}
						bookId={newObj.bookId}
						title={newObj.title}
					/>
				</div>
			);
			return newObj;
		});
	}
	return (
		<div>
			<h1>Books</h1>
			{content}
		</div>
	);
};

AdminBookRender.propTypes = {
	bookData: PropTypes.object,
	publisherData: PropTypes.array,
	authorData: PropTypes.array,
	genreData: PropTypes.array,
	handleRefresh: PropTypes.func,
	handleDelete: PropTypes.func,
	handleUpdate: PropTypes.func,
	handleCreate: PropTypes.func,
	requestInfo: PropTypes.object,
};

export default AdminBookRender;
