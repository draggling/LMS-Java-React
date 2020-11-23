'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import { Button } from 'reactstrap';

const CheckoutBookTable = ({ books, borrower, branch, handleCheckout }) => {
	function parsePublisherInfo(bookCopy) {
		return bookCopy.publisher.publisherName;
	}

	function parseAuthors(bookCopy) {
		if (bookCopy.authors.length == 0) {
			return '\nNo Authors';
		} else {
			let authors = '';
			for (let i = 0; i < bookCopy.authors.length; i++) {
				authors = authors.concat(bookCopy.authors[i].authorName);
				if (i < bookCopy.authors.length - 1) {
					authors = authors.concat(', ');
				}
			}
			return authors;
		}
	}

	function parseGenres(bookCopy) {
		if (bookCopy.genres.length == 0) {
			return '\nNo Genres';
		} else {
			let genres = '';
			for (let i = 0; i < bookCopy.genres.length; i++) {
				genres = genres.concat(bookCopy.genres[i].genreName);
				if (i < bookCopy.genres.length - 1) {
					genres = genres.concat(', ');
				}
			}
			return genres;
		}
	}

	function getBookRowsForCheckout() {
		return books.map((book) => {
			// Deep Clone object to bookId adding to it while mapping over it during map
			let bookDeepCopy = JSON.parse(JSON.stringify(book));

			bookDeepCopy.publisherName = parsePublisherInfo(bookDeepCopy);
			bookDeepCopy.authorInfo = parseAuthors(bookDeepCopy);
			bookDeepCopy.genreInfo = parseGenres(bookDeepCopy);
			bookDeepCopy.select = (
				<Button onClick={() => handleCheckout(book, borrower, branch)}>
					Select
				</Button>
			);
			return bookDeepCopy;
		});
	}
	let data = {
		columns: [
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
				label: 'Select',
				field: 'select',
				sort: 'asc',
			},
		],
		rows: getBookRowsForCheckout(),
	};
	return (
		<React.Fragment>
			<div className="mainblock">
				{/* <Button onClick={() => handleRefresh()}>Refresh Books</Button>{' '} */}
				<MDBDataTable striped bordered small responsive data={data} />
			</div>
		</React.Fragment>
	);
};

CheckoutBookTable.propTypes = {
	books: PropTypes.array,
	borrower: PropTypes.object,
	branch: PropTypes.object,
	handleCheckout: PropTypes.func,
};
export default CheckoutBookTable;
