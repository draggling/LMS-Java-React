'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import UpdateBookCopiesModal from '../Modal/Librarian/UpdateBookCopiesModal'

const LibrarianCopiesRender = ({
	branchData,
	selectedBranch,
	handleRefresh,
	bookCopies,
	setCopies,
}) => {
	let content = '';
	console.log("..........");
	console.log("LIBRARIAN COPIES RENDER");
	console.log("book copies:");
	console.log(bookCopies);
	console.log("..........");
	let branchName = 'null'
	/* get branchName */
	branchData.branches.map(branch => {
		if(branch.branchId == selectedBranch) {
			branchName = branch.branchName;
		}
	});

	let data = {
		columns: [
			{
				label: 'Book Name',
				field: 'title',
				sort: 'asc',
			},
			{
				label: 'Authors',
				field: 'authors',
				sort: 'asc',
			},
			{
				label: 'Copies',
				field: 'numberOfCopies', 
				sort: 'asc',
			},
            {
				label: 'Set Copies',
				field: 'copies',
				sort: 'asc',
            },
			],
			rows: getTableBodyContent(),
		};
	content = (
		<React.Fragment>
			<div className="mainblock">
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
	)

	if (!selectedBranch || !bookCopies) {
		content = (
			<div className="alert alert-danger" role="alert">
				Error while loading books!
			</div>
		);
	}
	function getAuthors(Authors) {
		if(Authors.length === 0) {
			return "No Authors"
		} else {
			let authors = "";
			for(let i = 0; i < Authors.length; i++) {
				authors = authors.concat(Authors[i].authorName);
				if(i < Authors.length - 1) {
					authors = authors.concat(", ");
				}
			}
			return authors;
		}
	}
	function getTableBodyContent() {
		return bookCopies.map((obj) => {
			// Deep Clone object to avoid adding to it while mapping over it during map
			let newObj = JSON.parse(JSON.stringify(obj));
			newObj.title = obj.book.title;
			newObj.authors = getAuthors(obj.book.authors);
			newObj.copies = (
				<div>
					<UpdateBookCopiesModal
					buttonLabel="Copies"
					bookId = {newObj.book.bookId}
					branchId={newObj.branch.branchId}
					branchName={newObj.branch.branchName}
					noOfCopies={newObj.numberOfCopies}
					setCopies={setCopies}
					handleRefresh={handleRefresh}
					/>
				</div>
			)
			return newObj;
		});
	}

	return (
		<div>
			<h1>Books In {branchName}</h1>
			{content}
		</div>
	);
};

LibrarianCopiesRender.propTypes = {
	branchData: PropTypes.object,
	bookCopies: PropTypes.array,
	selectedBranch: PropTypes.number,
	handleRefresh: PropTypes.func,
	setCopies: PropTypes.func,
	requestInfoCopies: PropTypes.object,
}

export default LibrarianCopiesRender;