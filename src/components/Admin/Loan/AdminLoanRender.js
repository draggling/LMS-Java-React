import React from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import ExtendModal from '../../Modal/AdminLoan/ExtendModal';
import Spinner from '../../Util/Spinner'
import { formatDate } from '../../../helpers/dateHelpers';


const AdminLoanRender = ({
	loanData,
	handleRefresh,
	handleExtend,
	requestInfo,
}) => {
	let content = '';
	if (!loanData || requestInfo.readPending) {
		content = Spinner();
	}
	if (loanData && requestInfo.readSuccessful) {
		let data = {
			columns: [
				{
					label: 'Borrower Info',
					field:	'cardInfo',
					sort: 'asc',
				},
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
					label: 'dateOut',
					field: 'parsedDateOut',
					sort: 'asc',
				},
				{
					label: 'dueDate',
					field: 'parsedDueDate',
					sort: 'asc',
				},
				{
					label: 'Extend Due Date',
					field: 'extend',
					sort: 'asc',
				},
			],
			rows: getTableBodyContent(),
			};
		return (
			<React.Fragment>
				<div className="mainblock">
					<MDBDataTable
						striped
						//bordered
						small
						responsive
						data={data}
					/>
				</div>
			</React.Fragment>
		);
	}

	if (loanData && requestInfo.readFailed) {
		content = (
			<div className="alert alert-danger" role="alert">
				Error while loading loanes!
			</div>
		);
	}
	function parseCardInfo(newObj) {
		/*
		let rawData = "Card Number: " + newObj['borrower.borrowerCardNo']
		+ "\nName: " + newObj['borrower.borrowerName']
		*/
		let rawData = "Name: " + newObj['borrower.borrowerName']
		+ "\nAddress " + newObj['borrower.borrowerAddress']
		+ "\nPhone " + newObj['borrower.borrowerPhone'];

		rawData = rawData.split("\n");
		let parsedCard = rawData.map((line)=><div key = {line.id}>{line}</div>);
		return parsedCard;
	}

	function parseBranchInfo(newObj) {
		/*
		let rawData = "Branch ID: " + newObj['branch.branchId']
		+ "\nName: " + newObj['branch.branchName']
		*/
		let rawData = newObj['branch.branchName']
		+ "\n" + newObj['branch.branchAddress'];
		rawData = rawData.split("\n");
		let parsedBranch = rawData.map((line)=><div key = {line.id}>{line}</div>);
		return parsedBranch;
	}

	function parseBookInfo(newObj) {
		// if(newObj == null) {
		// 	return "book error";
		// }
		//console.log("parseBookInfo:");
		//console.log(newObj);
		let rawData = "Title: " + newObj.book.title
		+ parseAuthors(newObj);
		rawData = rawData.split("\n");
		let parsedBook = rawData.map((line)=><div key = {line.id}>{line}</div>);
		return parsedBook;
	}
	function parseAuthors(newObj) {
		if(newObj.book.authors === null) {
			return "\nNo Authors"
		} else {
			let authors = "\nAuthors: ";
			for(let i = 0; i < newObj.book.authors.length; i++) {
				authors = authors.concat(newObj.book.authors[i].authorName);
				if(i < newObj.book.authors.length - 1) {
					authors = authors.concat(", ");
				}
			}
			return authors;
		}
	}

	function getTableBodyContent() {
		return loanData.loans.map((obj) => {
			let tempbook = parseBookInfo(obj);
			const flatten = require('flat').flatten;
			let newObj = flatten(obj);
			newObj.bookInfo = tempbook;
			/* will fix later */
			newObj.cardInfo = parseCardInfo(newObj);
			newObj.branchInfo = parseBranchInfo(newObj);
			newObj.parsedDueDate = formatDate(newObj.dueDate);
			newObj.parsedDateOut = formatDate(newObj.dateOut);
			//console.log("duedate: " + newObj.dueDate); 
			//let newObj = JSON.parse(JSON.stringify(obj));
			console.log(newObj);
			newObj.extend = (
				<div>
					<ExtendModal
						buttonLabel="Extend"
						handleExtend={handleExtend}
						handleRefresh={handleRefresh}
						cardNo={newObj['key.cardNo']}
						bookId={newObj['key.bookId']}
						branchId={newObj['key.branchId']}
						dueDate={newObj.dueDate.slice(0,10)}
					/>
				</div>
			);

			return newObj;
		});
	}
	return (
		<div>
			{content}
		</div>
	);
};

AdminLoanRender.propTypes = {
	loanData: PropTypes.object,
	handleRefresh: PropTypes.func,
	handleExtend: PropTypes.func,
	requestInfo: PropTypes.object,
};

export default AdminLoanRender;