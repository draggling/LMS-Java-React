'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import UpdateBookNonCopiesModal from '../Modal/Librarian/UpdateBookNonCopiesModal'

const LibrarianNonCopiesRender = ({
	branchData,
	selectedBranch,
    handleRefresh,
	bookNonCopies,
	setNonCopies,
}) => {
    let content = '';
    /*
	console.log("..........");
	console.log("LIBRARIAN NON COPIES RENDER");
	console.log("non book copies:");
    console.log(bookNonCopies);
    console.log("branch data");
    console.log(branchData);
    console.log("..........");
    */
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
				label: 'Add Copies',
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
					small
					responsive
					data={data}
				/>
			</div>
		</React.Fragment>
	)

	if (!selectedBranch || !bookNonCopies) {
		content = (
			<div className="alert alert-danger" role="alert">
				Error while loading books!
			</div>
		);
	}
	function getAuthors(Authors) {
		if(Authors.length === 0) {
			return "No Author"
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
		return bookNonCopies.map((obj) => {
			// Deep Clone object to avoid adding to it while mapping over it during map
			let newObj = JSON.parse(JSON.stringify(obj));
			newObj.title = obj.title;
			newObj.authors = getAuthors(obj.authors);
			newObj.copies = (
				<div>
					<UpdateBookNonCopiesModal
					buttonLabel="Copies"
					bookId = {newObj.bookId}
					branchId={selectedBranch}
					branchName={branchName}
					noOfCopies={0}
					setNonCopies={setNonCopies}
					handleRefresh={handleRefresh}
					/>
				</div>
			)
			return newObj;
		});
	}

	return (
		<div>
			<h1>Books not in {branchName}</h1>
			{content}
		</div>
	);
};

LibrarianNonCopiesRender.propTypes = {
    branchData: PropTypes.object,
	bookNonCopies: PropTypes.array,
	selectedBranch: PropTypes.number,
	handleRefresh: PropTypes.func,
	setNonCopies: PropTypes.func,
	requestInfoCopies: PropTypes.object,
}

export default LibrarianNonCopiesRender;