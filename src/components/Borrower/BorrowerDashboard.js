'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Spinner } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';

const BorrowerDashboard = ({
	borrower,
	dashboardInfo,
	handleCheckout,
	requestInfo,
	selectBranch,
	startCheckout,
	startReturn,
}) => {
	function createBranchRows() {
		return dashboardInfo.branches.map((branch) => {
			let deepCopyBranch = JSON.parse(JSON.stringify(branch));
			deepCopyBranch.select = (
				<Button onClick={() => selectBranch(branch)}>Select</Button>
			);
			return deepCopyBranch;
		});
	}
	function parsePublisherInfo(newObj) {
		return newObj.publisher.publisherName;
	}

	function parseAuthors(newObj) {
		if (newObj.authors.length == 0) {
			return '\nNo Authors';
		} else {
			let authors = '';
			for (let i = 0; i < newObj.authors.length; i++) {
				authors = authors.concat(newObj.authors[i].authorName);
				if (i < newObj.authors.length - 1) {
					authors = authors.concat(', ');
				}
			}
			return authors;
		}
	}

	function parseGenres(newObj) {
		if (newObj.genres.length == 0) {
			return '\nNo Genres';
		} else {
			let genres = '';
			for (let i = 0; i < newObj.genres.length; i++) {
				genres = genres.concat(newObj.genres[i].genreName);
				if (i < newObj.genres.length - 1) {
					genres = genres.concat(', ');
				}
			}
			return genres;
		}
	}

	function getBookRowsForCheckout() {
		return dashboardInfo.books.map((book) => {
			// Deep Clone object to bookId adding to it while mapping over it during map

			let bookDeepCopy = JSON.parse(JSON.stringify(book));

			bookDeepCopy.publisherName = parsePublisherInfo(bookDeepCopy);
			bookDeepCopy.authorInfo = parseAuthors(bookDeepCopy);
			bookDeepCopy.genreInfo = parseGenres(bookDeepCopy);
			bookDeepCopy.select = (
				<Button
					onClick={() =>
						handleCheckout(book, borrower, dashboardInfo.selectedBranch)
					}
				>
					Select
				</Button>
			);
			return bookDeepCopy;
		});
	}

	console.log(borrower);
	let content = '';
	if (!dashboardInfo.isCheckingOut && !dashboardInfo.isReturning) {
		content = (
			<div>
				<Button onClick={() => startCheckout()}>Check-out</Button>
				<Button onClick={() => startReturn()}>Return</Button>
			</div>
		);
	}
	if (dashboardInfo.isCheckingOut && !dashboardInfo.selectedBranch) {
		if (requestInfo.branchesPending) {
			content = (
				<div>
					<Button onClick={() => startCheckout()}>Check-out</Button>
					<Button onClick={() => startReturn()}>Return</Button>
					<Spinner type="grow" color="primary" />
				</div>
			);
		} else if (requestInfo.branchesSuccessful) {
			let data = {
				columns: [
					{
						label: 'Branch Name',
						field: 'branchName',
						sort: 'asc',
					},
					{
						label: 'Branch Address',
						field: 'branchAddress',
						sort: 'asc',
					},
					{
						label: 'Select',
						field: 'select',
						sort: 'asc',
					},
				],
				rows: createBranchRows(),
			};
			content = (
				<div>
					<Button onClick={() => startCheckout()}>Check-out</Button>
					<Button onClick={() => startReturn()}>Return</Button>
					<div className="mainblock">
						<MDBDataTable striped bordered small responsive data={data} />
					</div>
				</div>
			);
		} else if (requestInfo.branchesFailed) {
			content = (
				<Alert color="danger">
					Their was an error trying to access library branches please try again
					later or contact and Admin
				</Alert>
			);
		}
	} else if (dashboardInfo.isCheckingOut && dashboardInfo.selectedBranch) {
		if (requestInfo.booksPending) {
			content = (
				<div>
					<Button onClick={() => startCheckout()}>Check-out</Button>
					<Button onClick={() => startReturn()}>Return</Button>
					<Spinner type="grow" color="primary" />
				</div>
			);
		} else if (requestInfo.booksSuccessful) {
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
		} else if (requestInfo.booksFailed) {
			<Alert color="danger">
				Their was an error trying to access available books please try again later
				or contact and Admin
			</Alert>;
		}
	}

	if (dashboardInfo.isReturning) {
		content = 'Is Returning';
	}
	return content;
};

BorrowerDashboard.propTypes = {
	borrower: PropTypes.object,
	dashboardInfo: PropTypes.object,
	handleCheckout: PropTypes.func,
	requestInfo: PropTypes.object,
	selectBranch: PropTypes.func,
	startCheckout: PropTypes.func,
	startReturn: PropTypes.func,
};

export default BorrowerDashboard;
