'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import { Button } from 'reactstrap';
import { formatDate } from '../../helpers/dateHelpers';

const ReturnLoansTable = ({ handleReturn, loans }) => {
	//console.log(loans);

	function parseBranchInfo(newObj) {
		let rawData = newObj['branch.branchName'] + '\n' + newObj['branch.branchAddress'];
		rawData = rawData.split('\n');
		let parsedBranch = rawData.map((line) => <div key={line.id}>{line}</div>);
		return parsedBranch;
	}

	function parseBookInfo(newObj) {
		let rawData = 'Title: ' + newObj.book.title + parseAuthors(newObj);
		rawData = rawData.split('\n');
		let parsedBook = rawData.map((line) => <div key={line.id}>{line}</div>);
		return parsedBook;
	}
	function parseAuthors(newObj) {
		if (newObj.book.authors === null) {
			return '\nNo Authors';
		} else {
			let authors = '\nAuthors: ';
			for (let i = 0; i < newObj.book.authors.length; i++) {
				authors = authors.concat(newObj.book.authors[i].authorName);
				if (i < newObj.book.authors.length - 1) {
					authors = authors.concat(', ');
				}
			}
			return authors;
		}
	}

	function getTableBodyContent() {
		return loans.map((loan) => {
			let tempbook = parseBookInfo(loan);
			const flatten = require('flat').flatten;
			let loanCopy = flatten(loan);
			loanCopy.bookInfo = tempbook;
			/* will fix later */
			loanCopy.branchInfo = parseBranchInfo(loanCopy);
			loanCopy.parsedDueDate = formatDate(loanCopy.dueDate);
			loanCopy.parsedDateOut = formatDate(loanCopy.dateOut);
			loanCopy.return = <Button onClick={() => handleReturn(loan)}>Return</Button>;
			return loanCopy;
		});
	}
	let data = {
		columns: [
			{
				label: 'Book Info',
				field: 'bookInfo',
				sort: 'asc',
			},
			{
				label: 'Branch Info',
				field: 'branchInfo',
				sort: 'asc',
			},
			{
				label: 'Checkout Date',
				field: 'parsedDateOut',
				sort: 'asc',
			},
			{
				label: 'Due Date',
				field: 'parsedDueDate',
				sort: 'asc',
			},
			{
				label: 'Return',
				field: 'return',
				sort: 'asc',
			},
		],
		rows: getTableBodyContent(),
	};
	return (
		<React.Fragment>
			<div className="mainblock" key={2}>
				{/* <Button onClick={() => handleRefresh()}>Refresh Data</Button>{' '} */}
				<MDBDataTable striped small responsive data={data} />
			</div>
		</React.Fragment>
	);
};

ReturnLoansTable.propTypes = {
	loans: PropTypes.array,
	handleReturn: PropTypes.func,
};
export default ReturnLoansTable;
