'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import { Button } from 'reactstrap';

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

	function parseMonth(string) {
		var num = parseInt(string);
		switch (num) {
			case 1:
				return 'January';
			case 2:
				return 'February';
			case 3:
				return 'March';
			case 4:
				return 'April';
			case 5:
				return 'May';
			case 6:
				return 'June';
			case 7:
				return 'July';
			case 8:
				return 'August';
			case 9:
				return 'September';
			case 10:
				return 'October';
			case 11:
				return 'November';
			case 12:
				return 'December';
			default:
				return 'ERROR';
		}
	}
	function formatDate(obj) {
		const concat = (accumulator, currentValue) => accumulator + currentValue;
		//2020-09-14T04:00:00Z
		let array = Array.from(obj);
		//09-14-2020 : 04:00AM
		var am = true;
		if (array.slice(11, 13).reduce(concat) < 12) {
			am = true;
		} else {
			am = false;
		}
		var time = '';
		// Parse hours depending on AM or PM
		if (array.slice(11, 13).reduce(concat) > 12) {
			time =
				array.slice(11, 13).reduce(concat) -
				12 +
				array.slice(13, 16).reduce(concat) +
				(am ? 'AM' : 'PM');
		} else {
			time =
				parseInt(array.slice(11, 13).reduce(concat)) +
				array.slice(13, 16).reduce(concat) +
				(am ? 'AM' : 'PM');
		}
		// Parse Months
		var month = parseMonth(array.slice(5, 7).reduce(concat));
		return (
			month +
			' ' +
			parseInt(array.slice(8, 10).reduce(concat)) +
			', ' +
			array.slice(0, 4).reduce(concat) +
			' ' +
			time
		);
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
				<MDBDataTable striped bordered small responsive data={data} />
			</div>
		</React.Fragment>
	);
};

ReturnLoansTable.propTypes = {
	loans: PropTypes.array,
	handleReturn: PropTypes.func,
};
export default ReturnLoansTable;