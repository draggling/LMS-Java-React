
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import ExtendModal from '../../Modal/AdminLoan/ExtendModal';

const AdminLoanRender = ({
	loanData,
	handleRefresh,
	handleExtend,
	requestInfo,
}) => {
	let content = '';
	if (!loanData || requestInfo.readPending) {
		content = (
			<div className="d-flex justify-content-center">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	}
	if (loanData && requestInfo.readSuccessful) {
    console.log("loanData.loans:");
    console.log(loanData.loans);
	let data = {
		columns: [
			{
				label: 'Card Number',
				field:  'key.cardNo',
				sort: 'asc',
			},
			{
				label: 'Book Id',
				field: 'key["cardno"]',
				sort: 'asc',
			},
			{	
				label: 'Branch Id',
				field: 'key."cardNo"',
				sort: 'asc',
			},
			{
				label: 'dateOut',
				field: 'dateOut',
				sort: 'asc',
			},
			{
				label: 'dueDate',
				field: 'dueDate',
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

	if (loanData && requestInfo.readFailed) {
		content = (
			<div className="alert alert-danger" role="alert">
				Error while loading loanes!
			</div>
		);
	}
	function getTableBodyContent() {
		return loanData.loans.map((obj) => {
			// Deep Clone object to avoid loanId adding to it while mapping over it during map
			let newObj = JSON.parse(JSON.stringify(obj));
			console.log("newObj");
			console.log(newObj);
			newObj.extend = (
				<div>
					<ExtendModal
						buttonLabel="Extend"
						handleExtend={handleExtend}
						handleRefresh={handleRefresh}
						key={newObj.key}
						daysToExtend={newObj.daysToExtend}
					/>
				</div>
			);

			return newObj;
		});
	}
	return (
		<div>
			<h1>Loans</h1>
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